import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページが見つかりません — ハナ・チェック",
  description: "お探しのページは見つかりませんでした。",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F8FA",
        fontFamily: '"DM Sans","Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif',
        color: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0891B2", letterSpacing: "0.08em", margin: "0 0 8px" }}>
          404
        </p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0E7490", margin: "0 0 12px" }}>
          ページが見つかりませんでした
        </h1>
        <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.8, margin: "0 0 28px" }}>
          お探しのページは移動または削除された可能性があります。
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
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
            トップページへ
          </Link>
          <Link
            href="/blog"
            style={{
              display: "inline-block",
              background: "#fff",
              border: "1px solid #E5E7EB",
              color: "#374151",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 22px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            記事一覧へ
          </Link>
        </div>
      </div>
    </div>
  );
}
