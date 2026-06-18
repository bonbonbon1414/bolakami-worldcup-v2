"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { title: string; slug: string };

// Rotating headline ribbon. The ‹ › controls cycle headlines and it
// auto-advances every 5s (paused for prefers-reduced-motion).
export function NewsTicker({ items }: { items: Item[] }) {
  const [i, setI] = useState(0);
  const count = items.length;

  useEffect(() => {
    if (count <= 1) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % count), 5000);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) return null;
  const cur = items[i % count];

  return (
    <div
      id="jadwal"
      className="scroll-mt-24 mb-4 flex items-center justify-between gap-4 border-b border-border pb-3"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 rounded-sm bg-primary px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black">
          BOLAKAMI News
        </span>
        <Link
          href={`/berita/${cur.slug}`}
          className="truncate text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
        >
          {cur.title}
        </Link>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <span className="mr-1 hidden text-[11px] tabular-nums text-muted sm:inline">
          {(i % count) + 1}/{count}
        </span>
        <button
          type="button"
          aria-label="Berita sebelumnya"
          onClick={() => setI((v) => (v - 1 + count) % count)}
          className="grid h-7 w-7 cursor-pointer place-items-center rounded border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Berita selanjutnya"
          onClick={() => setI((v) => (v + 1) % count)}
          className="grid h-7 w-7 cursor-pointer place-items-center rounded border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
        >
          ›
        </button>
      </div>
    </div>
  );
}
