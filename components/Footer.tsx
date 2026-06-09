import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #E5E7EB",
      background: "#fff",
      padding: "24px 20px",
      marginTop: "auto",
      fontFamily: '"DM Sans","Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif',
    }}>
      <div style={{
        maxWidth: 720,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}>
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" style={linkStyle}>ハナ・チェック</Link>
          <Link href="/blog" style={linkStyle}>記事一覧</Link>
          <Link href="/about" style={linkStyle}>運営者情報</Link>
          <Link href="/privacy" style={linkStyle}>プライバシーポリシー</Link>
        </nav>
        <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>
          © {new Date().getFullYear()} ハナ・チェック — 本サービスは医療診断ではありません
        </p>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6B7280",
  textDecoration: "none",
};
