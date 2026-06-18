// Posts are read from the filesystem at BUILD time by scripts/gen-posts.mjs and
// written to posts.generated.json. We import that bundle here so the app never
// touches the filesystem at runtime (Cloudflare Workers have no fs).
import postsData from "./posts.generated.json";

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

// Already sorted newest-first by the generator.
const ALL_POSTS = postsData as Post[];

export function getAllPosts(): Post[] {
  return ALL_POSTS;
}

export function getPostSlugs(): string[] {
  return ALL_POSTS.map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return ALL_POSTS.filter((p) => p.featured);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return ALL_POSTS.filter((p) => p.category === categorySlug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const current = getPost(currentSlug);
  if (!current) return [];
  return ALL_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === current.category,
  ).slice(0, limit);
}
