import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
} from "@/lib/posts";
import { getLeague } from "@/lib/leagues";
import { formatDateLong } from "@/lib/format";
import { SITE_URL } from "@/lib/site";

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Tidak ditemukan" };
  const url = `/berita/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: "BolaKami",
      locale: "id_ID",
      images: post.cover ? [{ url: post.cover, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      site: "@Bolakamiofc",
      creator: "@Bolakamiofc",
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const league = getLeague(post.category);
  const related = getRelatedPosts(post.slug, 3);

  const shareUrl = `${SITE_URL}/berita/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareLinks = [
    {
      label: "Bagikan ke WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
      path: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02ZM12.05 20.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z",
    },
    {
      label: "Bagikan ke Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${shareText}`,
      path: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.62 8.16-1.86 8.78c-.14.63-.51.78-1.03.49l-2.85-2.1-1.37 1.33c-.15.15-.28.28-.57.28l.2-2.9 5.27-4.76c.23-.2-.05-.32-.36-.12L8.5 13.7l-2.81-.88c-.61-.19-.62-.61.13-.9l10.97-4.23c.51-.19.96.12.83.47z",
    },
    {
      label: "Bagikan ke X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`,
      path: "M17.53 3H20.5l-6.5 7.43L21.7 21h-6l-4.7-6.14L5.6 21H2.6l6.95-7.94L2 3h6.13l4.25 5.62L17.53 3zm-1.05 16.2h1.66L7.6 4.7H5.83l10.65 14.5z",
    },
    {
      label: "Bagikan ke Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      path: "M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.86.24-1.45 1.48-1.45H16.5V4.5c-.27-.04-1.2-.12-2.27-.12-2.25 0-3.79 1.37-3.79 3.9V10.5H8v3h2.44V21h3.06z",
    },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: [{ "@type": "Person", name: post.author }],
    publisher: {
      "@type": "Organization",
      name: "BolaKami",
      logo: {
        "@type": "ImageObject",
        url: "https://pub-152057235af540e0af1635a3863a9fba.r2.dev/logo-bolakami-BZH4nO91.png",
      },
    },
    image: post.cover ? [post.cover] : undefined,
    articleSection: league?.name ?? post.category,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/berita/${post.slug}`,
    },
    inLanguage: "id-ID",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <article>
        <div className="mx-auto max-w-3xl px-4 pt-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted"
          >
            <Link href="/" className="hover:text-primary">
              Beranda
            </Link>
            <span aria-hidden>/</span>
            <Link href="/berita" className="hover:text-primary">
              Berita
            </Link>
            {league ? (
              <>
                <span aria-hidden>/</span>
                <span className="truncate text-foreground/70">
                  {league.shortName}
                </span>
              </>
            ) : null}
          </nav>

          <header className="mb-8">
            {league ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                {league.shortName}
              </span>
            ) : null}
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {initials(post.author)}
                </span>
                <div className="leading-tight">
                  <div className="font-semibold text-foreground">
                    {post.author}
                  </div>
                  <div className="text-xs text-muted">
                    <time dateTime={post.date}>
                      {formatDateLong(post.date)}
                    </time>
                    {" · "}
                    {post.readMinutes} menit baca
                  </div>
                </div>
              </div>
              {/* Share */}
              <div className="flex items-center gap-1.5">
                {shareLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </header>
        </div>

        {post.cover ? (
          <div className="mx-auto mb-10 max-w-4xl px-4">
            <div className="overflow-hidden rounded-2xl ring-1 ring-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt={post.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-4 pb-10">
          <div
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Watch CTA */}
          <div className="my-10 overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-br from-primary/10 to-transparent p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  Live Streaming Gratis
                </div>
                <p className="mt-1 text-sm text-foreground/85">
                  Saksikan Piala Dunia 2026 gratis di BOLAKAMI — komentar bahasa
                  Indonesia, kualitas HD hingga 4K.
                </p>
              </div>
              <Link
                href="https://nonton.blkmi.com"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-extrabold text-black transition-colors hover:bg-primary-hover"
              >
                <span className="live-dot" aria-hidden />
                Nonton Live
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          {post.tags && post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-surface px-3 py-1 text-xs text-muted ring-1 ring-border"
                >
                  #{t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <SectionHeading title="Bacaan Terkait" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
