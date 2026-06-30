// Content strategy:
// - In Node (local `next dev` and the build/prerender step) we read the .mdx
//   files straight from the filesystem, so edits show up immediately.
// - At runtime on Cloudflare Workers there is no filesystem, so the fs read
//   throws and we fall back to posts.generated.json (produced at build time by
//   scripts/gen-posts.mjs and bundled into the Worker).
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import generated from "./posts.generated.json";

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

function readFromFilesystem(): Post[] | null {
  try {
    if (!fs.existsSync(POSTS_DIR)) return null;
    const files = fs
      .readdirSync(POSTS_DIR)
      .filter((f) => /\.mdx?$/.test(f));
    const posts = files.map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      const renderedHtml = remark().use(html).processSync(content).toString();
      const stats = readingTime(content);
      return {
        ...(data as PostFrontmatter),
        slug,
        content,
        html: renderedHtml,
        readMinutes: Math.max(1, Math.round(stats.minutes)),
      };
    });
    return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  } catch {
    // No filesystem (e.g. Cloudflare Workers runtime) — use the bundle.
    return null;
  }
}

// Read fresh each call so dev edits reflect immediately; falls back to the
// build-time bundle when the filesystem isn't available.
function allPosts(): Post[] {
  return readFromFilesystem() ?? (generated as Post[]);
}

export function getAllPosts(): Post[] {
  return allPosts();
}

export function getPostSlugs(): string[] {
  return allPosts().map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return allPosts().find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return allPosts().filter((p) => p.featured);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return allPosts().filter((p) => p.category === categorySlug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const posts = allPosts();
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}
