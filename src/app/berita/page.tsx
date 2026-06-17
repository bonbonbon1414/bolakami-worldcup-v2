import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getFeaturedPosts, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Berita Piala Dunia 2026 — Preview, Analisis & Prediksi Bolakami",
  description:
    "Semua berita BolaKami: preview matchup per grup, analisis taktik, profil tim peserta, dan prediksi Piala Dunia 2026. Ditulis dalam bahasa Indonesia.",
  alternates: { canonical: "/berita" },
};

function SectionHeader({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-border">
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

export default function BeritaPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts().slice(0, 3);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const rest = posts.filter((p) => !featuredSlugs.has(p.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Berita Piala Dunia 2026
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          {posts.length} artikel dari BolaKami — preview matchup per grup,
          analisis taktik, profil tim peserta, dan prediksi menjelang kickoff
          11 Juni 2026.
        </p>
      </header>

      <div className="space-y-12">
        {featured.length > 0 ? (
          <section>
            <SectionHeader label="Pilihan Editor" count={featured.length} />
            <PostGrid posts={featured} />
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section>
            <SectionHeader label="Semua Berita" count={rest.length} />
            <PostGrid posts={rest} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
