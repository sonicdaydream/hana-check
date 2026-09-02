import { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const contentDir = path.join(process.cwd(), "content", "blog");

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

function getAllArticles(): ArticleMeta[] {
  return readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = readFileSync(path.join(contentDir, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
      };
    });
}

function byDateDesc(a: ArticleMeta, b: ArticleMeta) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const articles = getAllArticles();
  const current = articles.find((a) => a.slug === currentSlug);
  const others = articles.filter((a) => a.slug !== currentSlug);

  const sameCategory = current
    ? others.filter((a) => a.category === current.category).sort(byDateDesc)
    : [];

  const related = [...sameCategory];
  if (related.length < 3) {
    const usedSlugs = new Set(related.map((a) => a.slug));
    const rest = others.filter((a) => !usedSlugs.has(a.slug)).sort(byDateDesc);
    related.push(...rest.slice(0, 3 - related.length));
  }

  const items = related.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section
      style={{
        marginTop: 24,
        padding: "20px 24px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#374151", marginBottom: 16 }}>
        関連記事
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0891B2", margin: "0 0 4px" }}>
              {article.title}
            </p>
            <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6 }}>
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
