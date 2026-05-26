import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者情報 — ハナ・チェック",
  description: "ハナ・チェックの運営者情報・サービス概要・免責事項についてご案内します。",
};

export default function AboutPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F8FA",
      fontFamily: '"DM Sans","Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif',
      color: "#111827",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 64px" }}>

        <h1 style={{
          fontSize: 26, fontWeight: 800, color: "#0E7490",
          margin: "0 0 32px", letterSpacing: "-0.01em",
        }}>
          運営者情報
        </h1>

        {/* このサービスについて */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>このサービスについて</h2>
          <p style={pStyle}>
            <strong>ハナ・チェック</strong>は、鼻水の写真をAIが分析して緊急度をお知らせする参考情報サービスです。
          </p>
          <p style={pStyle}>
            このサービスを作ったきっかけは、私自身の経験にあります。花粉症をきっかけに副鼻腔炎を発症し、「この鼻水の状態って大丈夫？受診すべき？」という判断に何度も悩みました。同じように鼻の症状で困っている方の、受診判断の一助になればと思い開発しました。
          </p>
        </section>

        <Divider />

        {/* 運営者プロフィール */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>運営者プロフィール</h2>
          <article>
            <table>
              <tbody>
                <tr>
                  <th>運営者</th>
                  <td>管理人</td>
                </tr>
                <tr>
                  <th>職歴</th>
                  <td>Webデザイン・データアナリスト・ディレクター・マーケターとして従事</td>
                </tr>
                <tr>
                  <th>開発背景</th>
                  <td>花粉症・副鼻腔炎の当事者として、鼻の症状に悩む方向けのサービスを開発</td>
                </tr>
              </tbody>
            </table>
          </article>
        </section>

        <Divider />

        {/* 医師監修について */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>医師監修について</h2>
          <p style={pStyle}>
            現在、耳鼻咽喉科の医師による監修を募集しています。監修いただける先生は、お問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <Divider />

        {/* 免責事項 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>免責事項</h2>
          <ul style={ulStyle}>
            <li style={liStyle}>本サービスは医療診断を目的とするものではありません</li>
            <li style={liStyle}>提供する情報はあくまで参考情報であり、診断・治療に代わるものではありません</li>
            <li style={liStyle}>症状が気になる場合は必ず医療機関を受診してください</li>
            <li style={liStyle}>本サービスの利用によって生じた損害について、運営者は責任を負いかねます</li>
          </ul>
        </section>

        <Divider />

        {/* お問い合わせ */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>お問い合わせ</h2>
          <p style={pStyle}>医師監修のご相談・サービスへのご意見はこちら：</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfzP9L6irVFI1urH85BDWVGxAuWWpxG44KhCXzDqukpCT354Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #0891B2, #0EA5E9)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 22px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            お問い合わせフォーム
          </a>
        </section>

      </div>
    </div>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", margin: "28px 0" }} />;
}

const sectionStyle: React.CSSProperties = { marginBottom: 0 };

const h2Style: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#0891B2",
  margin: "0 0 14px",
};

const pStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#374151",
  lineHeight: 1.8,
  margin: "0 0 12px",
};

const ulStyle: React.CSSProperties = {
  margin: 0,
  padding: "0 0 0 20px",
};

const liStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#374151",
  lineHeight: 1.8,
  marginBottom: 6,
};
