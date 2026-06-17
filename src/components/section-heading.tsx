import Link from "next/link";

export function SectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          <span className="border-l-4 border-primary pl-3">{title}</span>
        </h2>
        {subtitle ? (
          <p className="mt-1 pl-4 text-sm text-muted">{subtitle}</p>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="text-sm font-semibold text-primary hover:underline"
        >
          {actionLabel} →
        </Link>
      ) : null}
    </div>
  );
}
