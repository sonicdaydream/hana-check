import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "ハナ・チェック — 鼻水AIチェッカー",
  description: "鼻水の写真からAIが参考情報を提供します。医療診断ではありません。",
  verification: {
    google: "soiyQZuSWxOpYcGL6KXT3crQ0gkuuhmh1tlbr-SZmdM",
  },
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
              url: "https://hana-check.jp",
              description: "鼻水の写真からAIが状態を分析し、緊急度をお知らせするサービス"
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ハナ・チェック",
              url: "https://hana-check.jp"
            }
          ]) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <GoogleAnalytics gaId="G-BC67BBB234" />
      </body>
    </html>
  );
}
