type Review = {
  name: string;
  handle: string;
  rating: number; // 0–5, supports halves
  quote: string;
  avatar: string;
};

const REVIEWS: Review[] = [
  {
    name: "Dony Kolaka",
    handle: "@gibol_sejati",
    rating: 5,
    quote:
      "Streaming pertandingan semalam lancar jaya, nggak ngadat. Resolusinya memanjakan mata — cocok buat nobar bareng teman!",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=rizkypratama&backgroundColor=00d70d",
  },
  {
    name: "Budi Darto",
    handle: "@bolamania_id",
    rating: 5,
    quote:
      "Udah nyobain puluhan web streaming, BOLAKAMI paling stabil. Server kuat walau laga besar, nggak ada cerita buffering pas mau gol.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=andisaputra&backgroundColor=3b82f6",
  },
  {
    name: "Lian Mandagi",
    handle: "@anak_tribun08",
    rating: 5,
    quote:
      "Fitur jadwalnya ngebantu banget. Tinggal buka web buat cek jam tanding Timnas sama klub favorit. Nggak perlu pusing cari link sana-sini.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=bimasetiawan&backgroundColor=f59e0b",
  },
  {
    name: "Dika Aditya",
    handle: "@dkne",
    rating: 4.5,
    quote:
      "Nggak nyangka dapet kualitas 4K secara gratis. Persiapan matang nih buat nonton full turnamen Piala Dunia 2026. Sangat direkomendasikan!",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=dikaaditya&backgroundColor=ec4899",
  },
  {
    name: "Asep Sunandar",
    handle: "@sepsep",
    rating: 5,
    quote:
      "Buka di HP pakai kuota juga aman, webnya ringan dan nggak ngabisin banyak data. Tampilannya modern, nggak banyak iklan pop-up yang ganggu.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=rezapahlevi&backgroundColor=ef4444",
  },
  {
    name: "Bono Ahmad",
    handle: "@non_madridista",
    rating: 5,
    quote:
      "Update live score-nya beneran real-time. Kadang kalau lagi di luar dan nggak bisa nonton, cukup pantengin fitur live score di BOLAKAMI.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=fajarhidayat&backgroundColor=8b5cf6",
  },
];

function StarSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.98 6.1 20.17l1.13-6.57-4.78-4.66 6.6-.96L12 2z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} dari 5 bintang`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <StarSvg className="absolute inset-0 h-4 w-4 text-foreground/15" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <StarSvg className="h-4 w-4 text-accent" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="ulasan" className="scroll-mt-24 mt-16">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Apa Kata <span className="text-primary">Mereka?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Ribuan penggemar bola sudah membuktikan kualitas live streaming
          gratis BOLAKAMI.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure
            key={r.handle}
            className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-black/30"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 rounded-full ring-2 ring-border"
                />
                <figcaption className="leading-tight">
                  <div className="font-bold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted">{r.handle}</div>
                </figcaption>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-muted">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
