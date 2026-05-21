import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ハナ・チェック — 鼻水AIチェッカー",
  description: "鼻水の写真からAIが参考情報を提供します。医療診断ではありません。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ハナ・チェック",
              url: "https://hana-check-beta.vercel.app",
              description: "鼻水の写真からAIが状態を分析し、緊急度をお知らせするサービス"
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ハナ・チェック",
              url: "https://hana-check-beta.vercel.app"
            }
          ]) }}
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
