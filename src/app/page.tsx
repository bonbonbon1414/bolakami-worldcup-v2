import Link from "next/link";
import { LiveScores } from "@/components/live-scores";
import { NewsTicker } from "@/components/news-ticker";
import { PopularNews } from "@/components/popular-news";
import { FaqSection, type QA } from "@/components/faq-section";
import { Testimonials } from "@/components/testimonials";

const FAQ_UMUM: QA[] = [
  {
    q: "Kapan Piala Dunia 2026 dimulai?",
    a: "Piala Dunia 2026 resmi dibuka pada 11 Juni 2026 dengan partai pembuka di Estadio Azteca, Meksiko, dan berakhir dengan final pada 19 Juli 2026 di MetLife Stadium, New Jersey, Amerika Serikat.",
  },
  {
    q: "Negara mana saja yang menjadi tuan rumah?",
    a: "Untuk pertama kalinya, Piala Dunia digelar di tiga negara sekaligus: Amerika Serikat (11 kota), Kanada (2 kota), dan Meksiko (3 kota), dengan total 16 stadion tuan rumah.",
  },
  {
    q: "Berapa tim peserta dan bagaimana formatnya?",
    a: "Sebanyak 48 tim akan bersaing — terbanyak dalam sejarah. Mereka dibagi ke dalam 12 grup berisi 4 tim. Dua tim teratas tiap grup plus 8 peringkat tiga terbaik melaju ke babak 32 besar. Total 104 pertandingan digelar selama 39 hari.",
  },
  {
    q: "Siapa juara bertahan Piala Dunia?",
    a: "Argentina, yang menjuarai Piala Dunia 2022 di Qatar setelah mengalahkan Prancis melalui drama adu penalti di final. Lionel Messi akhirnya mengangkat trofi Piala Dunia pertamanya.",
  },
  {
    q: "Apakah Timnas Indonesia tampil di Piala Dunia 2026?",
    a: "Indonesia saat ini berjuang di babak ketiga kualifikasi Zona Asia. Peluang lolos langsung sulit, tapi tempat di babak playoff antar-konfederasi masih terbuka dengan beberapa pertandingan tersisa.",
  },
  {
    q: "Kapan undian grup Piala Dunia 2026 dilaksanakan?",
    a: "Undian grup resmi digelar di Las Vegas pada 5 Desember 2025. Pertandingan pertama Grup A mempertemukan tuan rumah Meksiko di Estadio Azteca pada 11 Juni 2026.",
  },
];

const FAQ_STREAMING: QA[] = [
  {
    q: "Apakah BOLAKAMI menyiarkan Piala Dunia 2026 secara langsung?",
    a: "Ya. BOLAKAMI menyediakan live streaming untuk seluruh 104 pertandingan Piala Dunia 2026, lengkap dengan komentar berbahasa Indonesia, statistik real-time, dan multi-angle replay sepanjang turnamen.",
  },
  {
    q: "Apakah live streaming BOLAKAMI gratis?",
    a: "Gratis sepenuhnya untuk semua pertandingan fase grup. Babak knockout (32 besar ke atas) memerlukan akun gratis tanpa kartu kredit — cukup login dengan email atau Google.",
  },
  {
    q: "Di perangkat apa saja saya bisa menonton?",
    a: "BOLAKAMI berjalan di semua perangkat modern: HP Android & iOS lewat browser maupun aplikasi, smart TV (Android TV, Apple TV, Chromecast, AirPlay), laptop, dan tablet. Kualitas otomatis menyesuaikan kecepatan internet, dari 360p hingga 4K HDR.",
  },
  {
    q: "Apakah ada highlight, replay, dan jadwal nonton ulang?",
    a: "Highlight 5 menit tersedia 60 menit setelah peluit akhir, dan replay pertandingan penuh tersimpan selama 7 hari. Kamu juga bisa setel pengingat kickoff lewat tombol bel di setiap halaman pertandingan.",
  },
];

// Combined FAQPage structured data (eligible for Google rich results).
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FAQ_UMUM, ...FAQ_STREAMING].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
import { getAllPosts, type Post } from "@/lib/posts";
import { getLeague } from "@/lib/leagues";
import { formatDateShort } from "@/lib/format";

function HeroImage({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  const league = getLeague(post.category);
  return (
    <div className="media-frame">
      <div className="media-skeleton" aria-hidden />
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt={post.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : (
        <div
          className="media-fallback flex items-center justify-center px-4 text-center text-lg font-bold leading-tight text-white/95"
          style={{
            background: `linear-gradient(135deg, ${
              league?.color ?? "#00d70d"
            } 0%, #0a0a0b 120%)`,
          }}
        >
          <span className="line-clamp-4">{post.title}</span>
        </div>
      )}
      <div className="media-scrim" aria-hidden />
      {league ? (
        <span className="absolute left-2 top-2 rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {league.shortName}
        </span>
      ) : null}
    </div>
  );
}

function HeroBigCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-primary/60">
      <Link href={`/berita/${post.slug}`} className="block">
        <HeroImage post={post} priority />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-muted">
          <time dateTime={post.date}>{formatDateShort(post.date)}</time>
          <span>•</span>
          <span>{post.readMinutes} mnt baca</span>
        </div>
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
          <Link
            href={`/berita/${post.slug}`}
            className="transition-colors group-hover:text-primary"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-2 text-sm text-muted">
          {post.description}
        </p>
        <div className="mt-auto pt-4 text-xs text-muted">
          Oleh <span className="font-medium text-foreground/80">{post.author}</span>
        </div>
      </div>
    </article>
  );
}

function HeroSmallCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-primary/60">
      <Link href={`/berita/${post.slug}`} className="block">
        <HeroImage post={post} />
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-1.5 flex items-center gap-2 text-[11px] text-muted">
          <time dateTime={post.date}>{formatDateShort(post.date)}</time>
        </div>
        <h3 className="text-sm font-bold leading-snug">
          <Link
            href={`/berita/${post.slug}`}
            className="line-clamp-3 transition-colors group-hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default function Home() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted">
        Belum ada artikel.
      </div>
    );
  }

  const [big, ...rest] = posts;
  const smalls = rest.slice(0, 4);
  const tickerItems = [big, ...smalls].map((p) => ({
    title: p.title,
    slug: p.slug,
  }));
  // Pool for the Popular grid — drop the hero articles (so they don't repeat)
  // and the heavy html/content fields (this list crosses to the client).
  const heroSlugs = new Set([big, ...smalls].map((p) => p.slug));
  const popularPool = posts
    .filter((p) => !heroSlugs.has(p.slug))
    .map((p) => ({ ...p, html: "", content: "" }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Hero header — broadcast panel, BOLAKAMI brand h1 for SEO */}
      <header className="hero-panel mb-8 rounded-2xl border border-border p-6 sm:p-8 md:p-10">
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="live-dot" aria-hidden />
            Live Streaming Gratis
          </span>

          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-primary">BOLAKAMI</span> — Live Streaming{" "}
            <span className="text-primary">Piala Dunia 2026</span> Gratis Tanpa
            Ribet
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Nonton{" "}
            <strong className="text-foreground/90">104 pertandingan</strong>{" "}
            Piala Dunia 2026 <strong className="text-foreground/90">gratis</strong>{" "}
            dengan komentar bahasa Indonesia — kualitas HD hingga 4K, tanpa
            daftar. Lihat{" "}
            <Link href="/jadwal" className="link-inline">
              jadwal lengkap
            </Link>
            ,{" "}
            <Link href="/grup" className="link-inline">
              preview per grup
            </Link>
            , dan{" "}
            <Link href="/berita" className="link-inline">
              berita terbaru
            </Link>{" "}
            menjelang kickoff 11 Juni 2026.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="https://nonton.blkmi.com"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-base font-extrabold text-black shadow-lg shadow-primary/20 transition-colors hover:bg-primary-hover"
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
            <Link
              href="/jadwal"
              className="inline-flex items-center rounded-full border border-border bg-surface-2/60 px-5 py-3 text-sm font-bold text-foreground/85 transition-colors hover:border-primary/60 hover:text-primary"
            >
              Lihat Jadwal Lengkap
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border/60 pt-5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { value: "48", label: "Tim" },
                { value: "104", label: "Laga" },
                { value: "16", label: "Stadion" },
                { value: "39", label: "Hari" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold tabular-nums text-primary">
                    {s.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* NEWS ribbon — rotating headlines */}
      <NewsTicker items={tickerItems} />

      {/* Hero grid: 1 big (left) + 2x2 small (right) */}
      <div className="grid gap-3 lg:grid-cols-2">
        <HeroBigCard post={big} />
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          {smalls.map((p) => (
            <HeroSmallCard key={p.slug} post={p} />
          ))}
        </div>
      </div>

      {/* Today's matches — SportMonks, updated client-side via /api/livescores */}
      <section id="skor" className="scroll-mt-24 mt-12">
        <div className="mb-5 flex flex-wrap items-end gap-x-6 gap-y-2 border-b border-border">
          <h2 className="flex items-center gap-2 border-b-2 border-primary pb-3 text-sm font-extrabold uppercase tracking-wider">
            <span className="live-dot" aria-hidden />
            Pertandingan Hari Ini
          </h2>
          <span className="pb-3 text-xs text-muted">
            Piala Dunia 2026 — skor & jadwal hari ini (WIB)
          </span>
        </div>
        <LiveScores />
      </section>

      {/* Popular News — filterable by category */}
      <PopularNews posts={popularPool} />

      {/* About BOLAKAMI */}
      <section id="tentang" className="scroll-mt-24 mt-16">
        <div className="grid items-center gap-10 overflow-hidden rounded-2xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
              Tentang BOLAKAMI
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              <span className="text-primary">BOLAKAMI</span>: Teman Setia
              Menuju Piala Dunia 2026
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              <Link href="/" className="font-semibold text-primary hover:underline">
                BOLAKAMI
              </Link>{" "}
              adalah portal{" "}
              <Link href="/berita" className="link-inline">
                berita
              </Link>{" "}
              dan live streaming bola gratis yang fokus penuh pada Piala
              Dunia 2026. Lewat BOLAKAMI, kamu bisa mengikuti turnamen
              48 tim pertama dalam sejarah yang digelar di Amerika
              Serikat, Kanada, dan Meksiko. Mulai dari{" "}
              <Link href="/grup" className="link-inline">
                preview tiap grup
              </Link>{" "}
              hingga{" "}
              <Link href="/jadwal" className="link-inline">
                jadwal lengkap
              </Link>
              , semua konten BOLAKAMI disajikan dalam bahasa Indonesia
              untuk fans di tanah air.
            </p>
            <p className="mt-3 text-muted leading-relaxed">
              Di Bolakami, kamu tidak hanya menonton — tapi juga memahami.
              Itulah yang membuat{" "}
              <Link href="/tentang" className="link-inline">
                BOLAKAMI
              </Link>{" "}
              berbeda dari sekadar situs live streaming biasa.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Live streaming gratis 104 pertandingan di BOLAKAMI",
                "Komentar khas BOLAKAMI berbahasa Indonesia & multi-angle",
                "Preview 48 tim & 16 stadion tuan rumah di BOLAKAMI",
                "Highlight, replay 7 hari, dan analisis taktik BOLAKAMI",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span className="text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "48", label: "Tim Peserta" },
              { value: "16", label: "Stadion Tuan Rumah" },
              { value: "104", label: "Pertandingan" },
              { value: "39", label: "Hari Turnamen" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-surface-2/60 p-5 text-center"
              >
                <div className="text-4xl font-extrabold tabular-nums text-primary sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <Testimonials />

      {/* FAQ — structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <FaqSection
        id="faq"
        eyebrow="Pertanyaan Umum"
        subtitle="Hal yang sering ditanyakan tentang Piala Dunia 2026"
        items={FAQ_UMUM}
      />
      <FaqSection
        eyebrow="FAQ Live Streaming"
        subtitle="Cara nonton Piala Dunia 2026 langsung di BOLAKAMI"
        items={FAQ_STREAMING}
      />
    </div>
  );
}
