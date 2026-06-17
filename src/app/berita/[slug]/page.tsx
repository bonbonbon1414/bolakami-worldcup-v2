import type { Metadata } from "next";
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
        <div className="mx-auto max-w-3xl px-4 pt-10">
          <header className="mb-8">
            {league ? (
              <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                {league.shortName}
              </span>
            ) : null}
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-lg text-muted">{post.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="font-medium text-foreground">
                  {post.author}
                </span>
              </div>
              <span>•</span>
              <time dateTime={post.date}>{formatDateLong(post.date)}</time>
              <span>•</span>
              <span>{post.readMinutes} menit baca</span>
            </div>
          </header>
        </div>

        {post.cover ? (
          <div className="mx-auto mb-8 max-w-6xl px-4">
            <div className="overflow-hidden rounded-xl ring-1 ring-border">
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

          {post.tags && post.tags.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2">
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
