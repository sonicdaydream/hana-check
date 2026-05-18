import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ — ハナ・チェック",
  description: "鼻水に関する症状・受診の目安に関する記事一覧",
};

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

function getPosts(): PostMeta[] {
  const dir = path.join(process.cwd(), "content", "blog");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = readFileSync(path.join(dir, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title ?? f,
        description: data.description ?? "",
        date: data.date ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div style={{ background: "#F7F8FA", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", color: "#111" }}>
          ブログ
        </h1>
        <p style={{ color: "#555", marginBottom: 32, fontSize: 15 }}>
          鼻水に関する症状・受診の目安に関する記事
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.map((post) => (
            <li
              key={post.slug}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "20px 24px",
                marginBottom: 16,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ color: "#0891B2", fontWeight: 600, fontSize: 18, textDecoration: "none" }}
              >
                {post.title}
              </Link>
              <p style={{ color: "#555", fontSize: 14, margin: "6px 0 4px" }}>
                {post.description}
              </p>
              <time style={{ color: "#999", fontSize: 13 }}>{post.date}</time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
