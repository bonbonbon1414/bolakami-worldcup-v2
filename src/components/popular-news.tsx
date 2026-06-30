"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";

// Filters mapped to tags that actually exist in the content, so each tab
// returns real results.
const FILTERS = [
  { key: "all", label: "Semua", test: () => true },
  {
    key: "grup",
    label: "Preview Grup",
    test: (p: Post) => !!p.tags?.some((t) => t.startsWith("grup-")),
  },
  {
    key: "16-besar",
    label: "16 Besar",
    test: (p: Post) => !!p.tags?.includes("16-besar"),
  },
  {
    key: "kuda-hitam",
    label: "Kuda Hitam",
    test: (p: Post) => !!p.tags?.includes("kuda-hitam"),
  },
  {
    key: "stadion",
    label: "Stadion",
    test: (p: Post) => !!p.tags?.includes("stadion"),
  },
  {
    key: "format",
    label: "Format",
    test: (p: Post) =>
      !!p.tags?.some((t) => ["format", "48-tim", "aturan-baru"].includes(t)),
  },
] as const;

const LIMIT = 9;

export function PopularNews({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    const f = FILTERS.find((x) => x.key === active) ?? FILTERS[0];
    return posts.filter(f.test).slice(0, LIMIT);
  }, [posts, active]);

  return (
    <section id="popular" className="scroll-mt-24 mt-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border">
        <h2 className="border-b-2 border-primary pb-3 text-sm font-extrabold uppercase tracking-wider">
          Popular News
        </h2>
        <nav className="flex flex-wrap gap-1 pb-2 text-xs font-semibold">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={active === f.key}
              className={`cursor-pointer rounded-full px-3 py-1 transition-colors ${
                active === f.key
                  ? "bg-primary text-black"
                  : "text-muted hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-muted">
          Belum ada artikel di kategori ini.
        </p>
      )}
    </section>
  );
}
