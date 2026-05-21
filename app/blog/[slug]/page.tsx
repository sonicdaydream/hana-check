import { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";

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
  return { title: data.title, description: data.description };
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
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    url: `https://hana-check-beta.vercel.app/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "ハナ・チェック編集部",
      url: "https://hana-check-beta.vercel.app"
    },
    publisher: {
      "@type": "Organization",
      name: "ハナ・チェック",
      url: "https://hana-check-beta.vercel.app"
    }
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
        </article>
        <div
          style={{
            marginTop: 32,
            padding: "20px 24px",
            background: "#E0F2F7",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            style={{ color: "#0891B2", fontWeight: 600, fontSize: 16, textDecoration: "none" }}
          >
            👃 実際の鼻水を写真で確認する → /
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
