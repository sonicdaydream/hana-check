import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";

const baseUrl = "https://hana-check.jp";
const contentDir = path.join(process.cwd(), "content", "blog");

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const blogEntries: MetadataRoute.Sitemap = slugs.map((f) => {
    const raw = readFileSync(path.join(contentDir, f), "utf-8");
    const { data } = matter(raw);
    const slug = f.replace(/\.mdx$/, "");
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: data.date ? new Date(data.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogEntries,
  ];
}
