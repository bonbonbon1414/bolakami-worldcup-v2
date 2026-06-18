// Build-time content generator.
// Reads content/posts/*.mdx (frontmatter + markdown), renders HTML, and writes
// src/lib/posts.generated.json. This lets the app import posts as a bundled
// module so it never touches the filesystem at runtime (Cloudflare Workers have
// no fs).
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUT = path.join(process.cwd(), "src", "lib", "posts.generated.json");

const files = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f))
  : [];

const posts = files.map((filename) => {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const renderedHtml = remark().use(html).processSync(content).toString();
  const stats = readingTime(content);
  return {
    ...data,
    slug,
    content,
    html: renderedHtml,
    readMinutes: Math.max(1, Math.round(stats.minutes)),
  };
});

// Newest first.
posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

fs.writeFileSync(OUT, JSON.stringify(posts));
console.log(`gen-posts: wrote ${posts.length} posts -> ${path.relative(process.cwd(), OUT)}`);
