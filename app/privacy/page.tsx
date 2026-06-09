import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー — ハナ・チェック",
  description: "ハナ・チェックのプライバシーポリシーです。収集する情報・利用目的・Cookieの使用についてご案内します。",
};

export default function PrivacyPage() {
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
          margin: "0 0 8px", letterSpacing: "-0.01em",
        }}>
          プライバシーポリシー
        </h1>
        <p style={{ fontSize: 13, color: "#9CA3AF", margin: "0 0 32px" }}>
          最終更新日：2026年6月9日
        </p>

        <section style={sectionStyle}>
          <p style={pStyle}>
            ハナ・チェック（以下「本サービス」）は、利用者のプライバシーを尊重し、
            個人情報の適切な取り扱いに努めます。
          </p>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <h2 style={h2Style}>1. 収集する情報</h2>
          <p style={pStyle}>本サービスでは、以下の情報を収集する場合があります。</p>
          <h3 style={h3Style}>アップロードされた画像</h3>
          <p style={pStyle}>
            AIによる分析のために、利用者がアップロードした鼻水の写真をサーバーに送信します。
            送信された画像はAI分析の処理にのみ使用し、サーバーへの保存や第三者への提供は行いません。
          </p>
          <h3 style={h3Style}>アクセス情報（Google Analytics）</h3>
          <p style={pStyle}>
            本サービスではGoogle Analytics 4（GA4）を使用し、
            ページビュー数・セッション数・利用デバイスなどの統計情報を収集しています。
            これらの情報は個人を特定するものではなく、サービス改善の目的にのみ使用します。
          </p>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. 情報の利用目的</h2>
          <ul style={ulStyle}>
            <li style={liStyle}>AIによる鼻水の状態分析の提供</li>
            <li style={liStyle}>サービスの品質改善・不具合対応</li>
            <li style={liStyle}>アクセス状況の分析（匿名統計情報として）</li>
          </ul>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. 第三者への情報提供</h2>
          <p style={pStyle}>
            本サービスは、以下の場合を除き、収集した情報を第三者に提供しません。
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>法令に基づく開示が必要な場合</li>
            <li style={liStyle}>
              AI分析のためにAnthropic社のAPIを利用しています。
              送信される画像データはAnthropic社の
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                プライバシーポリシー
              </a>
              に従って処理されます。
            </li>
          </ul>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Cookieについて</h2>
          <p style={pStyle}>
            本サービスではGoogle Analytics 4によるアクセス解析のためにCookieを使用しています。
            Cookieはブラウザの設定から無効にすることができます。
            無効にした場合でも本サービスの利用に支障はありませんが、
            一部の統計情報が正確に収集されない場合があります。
          </p>
          <p style={pStyle}>
            Google Analytics によるデータ収集を無効にしたい場合は、
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Google Analytics オプトアウトアドオン
            </a>
            をご利用ください。
          </p>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. プライバシーポリシーの変更</h2>
          <p style={pStyle}>
            本ポリシーは、法令の改正やサービス内容の変更に応じて予告なく更新することがあります。
            最新の内容は本ページでご確認ください。
          </p>
        </section>

        <Divider />

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. お問い合わせ</h2>
          <p style={pStyle}>
            個人情報の取り扱いに関するお問い合わせは、以下よりご連絡ください。
          </p>
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

const h3Style: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: "#374151",
  margin: "16px 0 8px",
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

const linkStyle: React.CSSProperties = {
  color: "#0891B2",
  textDecoration: "underline",
};
