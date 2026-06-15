import Link from "next/link";
import Image from "next/image";
import { Stethoscope } from "lucide-react";

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
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfzP9L6irVFI1urH85BDWVGxAuWWpxG44KhCXzDqukpCT354Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, color: "#BAE6FD", lineHeight: 1.4, display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}
        >
          <Stethoscope size={14} color="#BAE6FD" strokeWidth={2} style={{flexShrink: 0}} />
          耳鼻科の先生へ：医師監修を募集しています — お問い合わせフォームよりご連絡ください
        </a>
      </div>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#ffffff", padding: "10px 20px",
        borderBottom: "1px solid #E0F2FE",
      }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image src="/logo.png" alt="ハナ・チェック" width={140} height={35} unoptimized style={{ objectFit: "contain" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/blog" style={{
            color: "#0891B2", fontSize: 14, fontWeight: 500, textDecoration: "none",
          }}>
            記事一覧
          </Link>
          <Link href="/about" style={{
            color: "#0891B2", fontSize: 14, fontWeight: 500, textDecoration: "none",
          }}>
            運営者情報
          </Link>
        </div>
      </nav>
    </header>
  );
}
