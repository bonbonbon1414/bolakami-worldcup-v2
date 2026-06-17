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
}: {
  label: string;
  count: number;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="mb-5 flex scroll-mt-24 items-end justify-between gap-4 border-b border-border"
    >
      <h2 className="border-b-2 border-primary pb-3 text-sm font-extrabold uppercase tracking-wider">
        {label}
      </h2>
      <span className="pb-3 text-xs text-muted">{count} artikel</span>
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
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
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
