import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#0C4A6E", padding: "9px 16px",
      }}>
        <span className="pulse" style={{
          display: "inline-block",
          width: 7, height: 7, borderRadius: "50%",
          background: "#38BDF8", flexShrink: 0,
        }} />
        <span style={{ fontSize: 12, color: "#BAE6FD", lineHeight: 1.4 }}>
          🏥 耳鼻科の先生へ：医師監修を募集しています — Xでご連絡ください
        </span>
      </div>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#0891B2", padding: "10px 20px",
      }}>
        <a href="/" style={{
          color: "#fff", fontWeight: 800, fontSize: 18,
          textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
        }}>
          <span>👃</span>ハナ・チェック
        </a>
        <Link href="/blog" style={{
          color: "#CFFAFE", fontSize: 14, fontWeight: 500, textDecoration: "none",
        }}>
          記事一覧
        </Link>
      </nav>
    </header>
  );
}
