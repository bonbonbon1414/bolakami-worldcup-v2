import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  cover?: string;
  tags?: string[];
  featured?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  html: string;
  readMinutes: number;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const renderedHtml = remark().use(html).processSync(content).toString();
  const stats = readingTime(content);
  return {
    ...fm,
    slug,
    content,
    html: renderedHtml,
    readMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f));
  return files
    .map(readPostFile)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const current = getPost(currentSlug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}
