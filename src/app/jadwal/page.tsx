import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getAllPosts, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Jadwal Pertandingan Piala Dunia 2026",
  description:
    "Jadwal lengkap pertandingan Piala Dunia 2026 — preview matchup per grup, analisis taktik, dan link live streaming gratis di BolaKami.",
  alternates: { canonical: "/jadwal" },
};

const GROUPS: { tag: string; label: string }[] = [
  { tag: "grup-a", label: "Grup A" },
  { tag: "grup-b", label: "Grup B" },
  { tag: "grup-c", label: "Grup C" },
  { tag: "grup-d", label: "Grup D" },
  { tag: "grup-e", label: "Grup E" },
  { tag: "grup-f", label: "Grup F" },
  { tag: "grup-g", label: "Grup G" },
  { tag: "grup-h", label: "Grup H" },
  { tag: "grup-i", label: "Grup I" },
  { tag: "grup-j", label: "Grup J" },
  { tag: "grup-k", label: "Grup K" },
  { tag: "grup-l", label: "Grup L" },
];

function SectionHeader({
  label,
  count,
  id,
  badge,
}: {
  label: string;
  count: number;
  id?: string;
  badge?: string;
}) {
  return (
    <div
      id={id}
      className="mb-5 flex scroll-mt-24 items-center justify-between gap-4 border-b border-border pb-3"
    >
      <div className="flex items-center gap-3">
        {badge ? (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-base font-extrabold text-primary">
            {badge}
          </span>
        ) : (
          <span className="h-6 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
        )}
        <h2 className="text-lg font-extrabold tracking-tight">{label}</h2>
      </div>
      <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted">
        {count} artikel
      </span>
    </div>
  );
}

function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  );
}

export default function JadwalPage() {
  const posts = getAllPosts();

  const byGroup = GROUPS.map((g) => ({
    ...g,
    posts: posts.filter((p) => p.tags?.includes(g.tag)),
  })).filter((g) => g.posts.length > 0);

  const kualifikasi = posts.filter((p) => p.tags?.includes("kualifikasi"));

  const others = posts.filter(
    (p) =>
      !p.tags?.some((t) => t.startsWith("grup-")) &&
      !p.tags?.includes("kualifikasi"),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 border-b border-border pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          Jadwal Lengkap
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Jadwal Pertandingan Piala Dunia 2026
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Preview lengkap per grup — analisis taktik, profil tim, dan jadwal
          kickoff dalam Waktu Indonesia Barat (WIB). Saksikan live streaming
          gratis di BolaKami.
        </p>
      </header>

      <div className="space-y-12">
        {byGroup.map((g) => (
          <section key={g.tag}>
            <SectionHeader
              label={g.label}
              count={g.posts.length}
              id={g.tag}
              badge={g.label.replace("Grup ", "")}
            />
            <PostGrid posts={g.posts} />
          </section>
        ))}

        {kualifikasi.length > 0 ? (
          <section>
            <SectionHeader label="Kualifikasi" count={kualifikasi.length} />
            <PostGrid posts={kualifikasi} />
          </section>
        ) : null}

        {others.length > 0 ? (
          <section>
            <SectionHeader label="Liputan Lainnya" count={others.length} />
            <PostGrid posts={others} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
