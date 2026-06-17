import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Grup Piala Dunia 2026 — Semua Grup A sampai L di Bolakami",
  description:
    "Daftar lengkap 12 grup Piala Dunia 2026 di BolaKami — tim peserta per grup, preview matchup, dan link ke artikel masing-masing pertandingan.",
  alternates: { canonical: "/grup" },
};

const GROUP_LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
] as const;

// Parse "Team1 vs Team2" from titles formatted as
// "Preview Grup X: Team1 vs Team2, ..."
function parseTeams(title: string): string[] {
  const match = title.match(/Preview\s+Grup\s+[A-Z]:\s*([^,]+)/i);
  if (!match) return [];
  const pair = match[1].split(/\s+vs\s+/i).map((t) => t.trim());
  return pair.filter(Boolean);
}

export default function GrupPage() {
  const posts = getAllPosts();

  const groups = GROUP_LETTERS.map((letter) => {
    const tag = `grup-${letter}`;
    const articles = posts.filter((p) => p.tags?.includes(tag));
    const teamSet = new Set<string>();
    articles.forEach((a) =>
      parseTeams(a.title).forEach((t) => teamSet.add(t)),
    );
    return {
      letter: letter.toUpperCase(),
      tag,
      articles,
      teams: Array.from(teamSet),
    };
  });

  const totalArticles = groups.reduce((s, g) => s + g.articles.length, 0);
  const activeGroups = groups.filter((g) => g.articles.length > 0).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Grup Piala Dunia 2026
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          12 grup berisi 48 tim akan bertarung di Piala Dunia 2026 — pilih
          grup di bawah untuk melihat preview matchup, profil tim, dan
          jadwal kickoff. Saat ini BolaKami sudah menyajikan{" "}
          <span className="font-semibold text-foreground">
            {totalArticles} preview
          </span>{" "}
          dari <span className="font-semibold text-foreground">{activeGroups}</span>{" "}
          grup.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const hasArticles = g.articles.length > 0;
          const CardEl = hasArticles ? Link : "div";
          const cardProps = hasArticles
            ? { href: `/jadwal#${g.tag}` }
            : { "aria-disabled": true };

          return (
            <CardEl
              key={g.tag}
              {...(cardProps as { href: string })}
              className={[
                "block rounded-xl border p-6 transition-colors",
                hasArticles
                  ? "border-border bg-surface hover:border-primary/60"
                  : "cursor-default border-border/40 bg-surface/40 opacity-60",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary/15 text-2xl font-extrabold text-primary">
                  {g.letter}
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Piala Dunia 2026
                  </div>
                  <div className="text-lg font-extrabold">
                    Grup {g.letter}
                  </div>
                </div>
              </div>

              {g.teams.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {g.teams.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-foreground/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="text-muted">
                  {hasArticles
                    ? `${g.articles.length} preview tersedia`
                    : "Belum ada preview"}
                </span>
                {hasArticles ? (
                  <span className="font-semibold text-primary">
                    Lihat →
                  </span>
                ) : null}
              </div>
            </CardEl>
          );
        })}
      </div>
    </div>
  );
}
