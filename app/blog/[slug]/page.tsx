import { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";
import { Wind } from "lucide-react";

const contentDir = path.join(process.cwd(), "content", "blog");

export async function generateStaticParams() {
  return readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const raw = readFileSync(path.join(contentDir, `${slug}.mdx`), "utf-8");
  const { data } = matter(raw);
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = readFileSync(path.join(contentDir, `${slug}.mdx`), "utf-8");
  const { data } = matter(raw);
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hana-check.jp/blog/${slug}`,
    },
    headline: data.title,
    description: data.description,
    keywords: Array.isArray(data.keywords) ? data.keywords.join(", ") : data.keywords,
    datePublished: data.date,
    dateModified: data.updated ?? data.date,
    url: `https://hana-check.jp/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "ハナ・チェック編集部",
      url: "https://hana-check.jp"
    },
    publisher: {
      "@type": "Organization",
      name: "ハナ・チェック",
      url: "https://hana-check.jp"
    },
  };

  return (
    <div style={{ background: "#F7F8FA", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link
          href="/blog"
          style={{ color: "#0891B2", fontSize: 14, textDecoration: "none" }}
        >
          ← 記事一覧へ戻る
        </Link>
        <article
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "32px 40px",
            marginTop: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            lineHeight: 1.8,
            color: "#222",
          }}
        >
          <time style={{ color: "#999", fontSize: 13 }}>{data.date}</time>
          <Post />
          {data.references && Array.isArray(data.references) && (
            <section style={{ marginTop: 40, borderTop: "1px solid #E5E7EB", paddingTop: 24 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#374151", marginBottom: 12 }}>参考文献・情報源</h2>
              <ol style={{ margin: 0, padding: "0 0 0 20px" }}>
                {data.references.map((ref: { title: string; url: string }, i: number) => (
                  <li key={i} style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ color: "#0891B2" }}>
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>
        <div style={{
          marginTop: 24,
          padding: "20px 24px",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #0891B2, #0EA5E9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: "#fff", fontWeight: 800, fontSize: 18,
          }}>編</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>ハナ・チェック編集部</p>
            <p style={{ fontSize: 12, color: "#555", margin: "0 0 4px", lineHeight: 1.6 }}>
              Webデザイン・データアナリスト・ディレクターとして従事。花粉症・副鼻腔炎の当事者として、鼻の症状で悩む方向けの参考情報を発信しています。
            </p>
            <p style={{ fontSize: 11, color: "#999", margin: 0 }}>※本記事は医療専門家による監修を目指しています。現在、耳鼻咽喉科医師の監修者を募集中です。</p>
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            padding: "20px 24px",
            background: "#E0F2F7",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            style={{ color: "#0891B2", fontWeight: 600, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Wind size={18} strokeWidth={2} />実際の鼻水を写真で確認する →
          </Link>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </div>
  );
}
