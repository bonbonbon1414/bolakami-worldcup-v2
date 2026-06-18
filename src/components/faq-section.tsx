export type QA = { q: string; a: string };

// Flush divider list — borderless rows split by hairlines, full width. Native
// <details> (works without JS, keyboard-accessible). The + collapses to a − when
// the row is open.
export function FaqSection({
  eyebrow,
  subtitle,
  items,
  id,
}: {
  eyebrow: string;
  subtitle: string;
  items: QA[];
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 mt-16">
      <div className="mb-2 flex flex-wrap items-end gap-x-6 gap-y-2 border-b border-border">
        <h2 className="border-b-2 border-primary pb-3 text-sm font-extrabold uppercase tracking-wider">
          {eyebrow}
        </h2>
        <span className="pb-3 text-xs text-muted">{subtitle}</span>
      </div>

      <div className="divide-y divide-border">
        {items.map((faq) => (
          <details key={faq.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-primary group-open:text-primary">
                {faq.q}
              </h3>
              {/* plus → minus toggle */}
              <span
                className="relative h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-primary group-open:text-primary"
                aria-hidden
              >
                <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded-full bg-current transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
