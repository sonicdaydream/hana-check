import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `あなたは医療情報の参考提供アシスタントです。
ユーザーが鼻水・鼻くその画像を送ってきます。

【絶対NG】
- 「〇〇です」という断定的な診断表現
- 薬の具体的な商品名の推奨

【必須】
- 「一般的な傾向として」という表現を使う
- 画像が不鮮明・判断困難な場合は正直に伝える

【possible_conditionsの補足】
- 鼻水の種類が「透明・白っぽい」系の場合、「黄砂・PM2.5による鼻粘膜刺激の可能性」を他の候補と同列のタグとして含める
- 黄色・緑・赤・血が混じる系の場合は上記タグを含めない

【出力形式】JSONのみ（マークダウン記号不要）：
{"urgency":1〜5,"color_analysis":"色・性状の説明30文字以内","possible_conditions":["状態1","状態2"],"home_care":"ケア提案50文字以内","advice":"受診タイミング目安60文字以内","confidence":"low|medium|high"}`;

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, imageMime, colorType } = await req.json();

    if (!imageBase64 || !imageMime || !colorType) {
      return NextResponse.json({ error: "パラメータが不足しています" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: imageMime as "image/jpeg" | "image/png" | "image/gif" | "image/webp", data: imageBase64 },
            },
            {
              type: "text",
              text: `鼻水の種類：${colorType}。JSONのみ返してください。`,
            },
          ],
        },
      ],
    });

    const text = message.content.find((b) => b.type === "text")?.text ?? "";
    const result = JSON.parse(text.replace(/```json|```/g, "").trim());
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "分析に失敗しました" }, { status: 500 });
  }
}
