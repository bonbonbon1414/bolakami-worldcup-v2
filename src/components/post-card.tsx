import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDateShort } from "@/lib/format";
import { getLeague } from "@/lib/leagues";

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Cover({
  title,
  color,
  src,
  badge,
}: {
  title: string;
  color?: string;
  src?: string;
  badge?: string;
}) {
  return (
    <div className="media-frame">
      {/* Skeleton placeholder — painted over once the image loads */}
      <div className="media-skeleton" aria-hidden />
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={title} loading="lazy" decoding="async" />
      ) : (
        <div
          className="media-fallback flex items-center justify-center text-center text-xl font-bold leading-tight text-white/95"
          style={{
            background: `linear-gradient(135deg, ${color ?? "#00d70d"}, #0a0a0b 130%)`,
          }}
        >
          <span className="px-4 line-clamp-3">{title}</span>
        </div>
      )}
      {/* Scrim keeps the overlaid label legible over any image */}
      <div className="media-scrim" aria-hidden />
      {badge ? (
        <span className="absolute left-2 top-2 rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  const league = getLeague(post.category);
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-surface transition duration-200 hover:border-primary/60 hover:shadow-lg hover:shadow-black/30">
      <Link href={`/berita/${post.slug}`} className="block">
        <Cover
          title={post.title}
          color={league?.color}
          src={post.cover}
          badge={league?.shortName}
        />
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted">
          <time dateTime={post.date}>{formatDateShort(post.date)}</time>
          <span>•</span>
          <span>{post.readMinutes} mnt baca</span>
        </div>
        <h3 className="text-base font-semibold leading-snug">
          <Link
            href={`/berita/${post.slug}`}
            className="transition-colors group-hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {post.description}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
            {initials(post.author)}
          </span>
          <span>
            Oleh{" "}
            <span className="font-medium text-foreground/80">
              {post.author}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

