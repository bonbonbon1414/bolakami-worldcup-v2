import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

// Required for `output: export` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();

  // Static section pages.
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/jadwal`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/berita`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/grup`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tentang`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const articleEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/berita/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: post.featured ? 0.9 : 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
