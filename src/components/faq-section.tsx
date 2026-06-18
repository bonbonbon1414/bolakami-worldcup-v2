export type QA = { q: string; a: string };

// Native <details> accordion — works without JS, keyboard-accessible. The
// chevron sits in a pill that fills green and flips when the item is open.
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
      <div className="mb-5 flex flex-wrap items-end gap-x-6 gap-y-2 border-b border-border">
        <h2 className="border-b-2 border-primary pb-3 text-sm font-extrabold uppercase tracking-wider">
          {eyebrow}
        </h2>
        <span className="pb-3 text-xs text-muted">{subtitle}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-xl border border-border bg-surface transition-colors hover:border-primary/40 open:border-primary/50 open:bg-surface-2/30"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
              <h3 className="flex-1 text-sm font-bold text-foreground">
                {faq.q}
              </h3>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors group-open:border-primary group-open:bg-primary group-open:text-black">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="border-t border-border/60 px-4 py-3.5 text-sm leading-relaxed text-muted">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
