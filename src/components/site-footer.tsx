import Link from "next/link";
import { getAllPosts, getFeaturedPosts, type Post } from "@/lib/posts";
import { LEAGUES, getLeague } from "@/lib/leagues";
import { formatDateShort } from "@/lib/format";

function PostThumb({ post }: { post: Post }) {
  const league = getLeague(post.category);
  return (
    <Link
      href={`/berita/${post.slug}`}
      className="relative grid h-14 w-20 shrink-0 place-items-end overflow-hidden rounded-md"
      style={
        post.cover
          ? undefined
          : {
              background: `linear-gradient(135deg, ${
                league?.color ?? "#10b981"
              }, #0b0f14 120%)`,
            }
      }
    >
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <span className="relative z-10 m-1 inline-block max-w-full truncate rounded-sm bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">
        {league?.shortName ?? "Bola"}
      </span>
    </Link>
  );
}

function PostRow({ post }: { post: Post }) {
  return (
    <li className="flex gap-3">
      <PostThumb post={post} />
      <div className="min-w-0 flex-1">
        <Link
          href={`/berita/${post.slug}`}
          className="block text-sm font-semibold leading-snug text-foreground/90 hover:text-primary"
        >
          <span className="line-clamp-2">{post.title}</span>
        </Link>
        <time
          dateTime={post.date}
          className="mt-1 block text-xs text-muted"
        >
          {formatDateShort(post.date)}
        </time>
      </div>
    </li>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-5 text-sm font-extrabold uppercase tracking-wider text-foreground">
      {children}
    </h4>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-10 w-10 place-items-center rounded-md border border-border bg-surface-2/50 text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  const featured = getFeaturedPosts().slice(0, 3);
  const all = getAllPosts();
  const popular = all
    .filter((p) => !featured.some((f) => f.slug === p.slug))
    .slice(0, 3);

  const categoryCounts = LEAGUES.map((l) => ({
    league: l,
    count: all.filter((p) => p.category === l.slug).length,
  }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <ColumnHeading>Pilihan Editor</ColumnHeading>
            <ul className="space-y-4">
              {featured.map((p) => (
                <PostRow key={p.slug} post={p} />
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Posting Populer</ColumnHeading>
            <ul className="space-y-4">
              {popular.map((p) => (
                <PostRow key={p.slug} post={p} />
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Kategori Populer</ColumnHeading>
            <ul className="divide-y divide-border">
              {categoryCounts.map(({ league, count }) => (
                <li
                  key={league.slug}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="text-foreground/85">
                    {league.shortName}
                  </span>
                  <span className="text-muted tabular-nums">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-10 border-border" />

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://pub-152057235af540e0af1635a3863a9fba.r2.dev/logo-bolakami-BZH4nO91.png"
                alt="BolaKami"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
            </div>
            <ColumnHeading>Tentang Kami</ColumnHeading>
            <p className="text-sm leading-relaxed text-muted">
              <Link
                href="/"
                className="font-semibold text-primary hover:underline"
              >
                BOLAKAMI
              </Link>{" "}
              adalah platform live streaming khusus{" "}
              <Link href="/jadwal" className="link-inline">
                Piala Dunia 2026
              </Link>
              . Saksikan seluruh 104 pertandingan dari Amerika Serikat,
              Kanada, dan Meksiko — gratis, berkomentar bahasa Indonesia,
              dan dapat ditonton di HP, smart TV, maupun laptop. Lihat{" "}
              <Link href="/berita" className="link-inline">
                berita terbaru
              </Link>{" "}
              dan{" "}
              <Link href="/grup" className="link-inline">
                preview semua grup
              </Link>{" "}
              menjelang kickoff 11 Juni 2026.
            </p>
            <p className="mt-4 text-sm text-muted">
              Hubungi kami:{" "}
              <a
                href="mailto:support@bolakami.click"
                className="link-inline"
              >
                support@bolakami.click
              </a>
            </p>
          </div>

          <div>
            <ColumnHeading>Ikuti Kami</ColumnHeading>
            <div className="flex flex-wrap gap-2">
              <SocialButton
                href="https://www.facebook.com/bolakamiofc"
                label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.86.24-1.45 1.48-1.45H16.5V4.5c-.27-.04-1.2-.12-2.27-.12-2.25 0-3.79 1.37-3.79 3.9V10.5H8v3h2.44V21h3.06z" />
                </svg>
              </SocialButton>
              <SocialButton
                href="https://www.instagram.com/bolakamiofficial2/"
                label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </SocialButton>
              <SocialButton
                href="https://x.com/Bolakamiofc"
                label="X"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M17.53 3H20.5l-6.5 7.43L21.7 21h-6l-4.7-6.14L5.6 21H2.6l6.95-7.94L2 3h6.13l4.25 5.62L17.53 3zm-1.05 16.2h1.66L7.6 4.7H5.83l10.65 14.5z" />
                </svg>
              </SocialButton>
              <SocialButton
                href="https://www.tiktok.com/@bolakami"
                label="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
                </svg>
              </SocialButton>
              <SocialButton
                href="https://t.me/bolakamiofficial"
                label="Telegram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.62 8.16-1.86 8.78c-.14.63-.51.78-1.03.49l-2.85-2.1-1.37 1.33c-.15.15-.28.28-.57.28l.2-2.9 5.27-4.76c.23-.2-.05-.32-.36-.12L8.5 13.7l-2.81-.88c-.61-.19-.62-.61.13-.9l10.97-4.23c.51-.19.96.12.83.47z" />
                </svg>
              </SocialButton>
              <SocialButton
                href="https://www.threads.com/@bolakamiofficial2"
                label="Threads"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12.19 24h-.01c-3.58-.02-6.33-1.2-8.18-3.51C2.35 18.44 1.5 15.59 1.47 12.01v-.02c.03-3.58.88-6.43 2.53-8.48C5.85 1.2 8.6.02 12.18 0h.01c2.75.02 5.05.72 6.83 2.1 1.68 1.29 2.86 3.13 3.51 5.47l-2.04.57C19.39 4.18 16.6 2.16 12.19 2.13c-2.91.02-5.11.94-6.54 2.72C4.31 6.5 3.62 8.91 3.59 12c.03 3.09.72 5.5 2.06 7.16 1.43 1.78 3.63 2.7 6.54 2.72 2.62-.02 4.36-.63 5.8-2.05 1.65-1.61 1.62-3.59 1.09-4.8-.31-.71-.87-1.3-1.63-1.75-.19 1.35-.62 2.45-1.28 3.27-.89 1.1-2.14 1.7-3.73 1.79-1.2.07-2.36-.22-3.26-.8-1.06-.69-1.69-1.74-1.75-2.96-.07-1.19.41-2.29 1.33-3.08.88-.76 2.12-1.21 3.58-1.29 1.08-.06 2.09 0 3.02.14-.13-.74-.38-1.33-.75-1.76-.51-.59-1.31-.88-2.37-.89h-.03c-.85 0-2 .23-2.73 1.32L7.79 8.65c.94-1.4 2.42-2.02 4.37-2.02h.04c3.25.02 5.18 2.02 5.37 5.52.11.05.21.09.32.14 1.49.7 2.58 1.76 3.15 3.07.8 1.82.87 4.79-1.55 7.16-1.85 1.81-4.09 2.63-7.28 2.65zm1-11.69c-.24 0-.49.01-.74.02-1.84.1-2.98.95-2.92 2.14.07 1.26 1.45 1.84 2.79 1.77 1.22-.06 2.82-.54 3.09-3.71a10.5 10.5 0 0 0-2.22-.22z" />
                </svg>
              </SocialButton>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-muted md:flex-row">
          <p>© {year} Bolakami Berita. All Rights Reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/tentang" className="hover:text-primary">About</Link>
            <Link href="/tentang" className="hover:text-primary">Author</Link>
            <Link href="/tentang" className="hover:text-primary">Contact Us</Link>
            <Link href="/tentang" className="hover:text-primary">Disclaimer</Link>
            <Link href="/tentang" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-primary">Sitemap</Link>
          </nav>
        </div>
        {/* Histats counter — populated by the tracker script in layout.tsx */}
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 pb-4">
          <div id="histats_counter" />
        </div>
      </div>
    </footer>
  );
}
