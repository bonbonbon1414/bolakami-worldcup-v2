import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang BOLAKAMI — Hub Live Streaming Piala Dunia 2026",
  description:
    "BolaKami adalah platform live streaming gratis khusus Piala Dunia 2026 — 104 pertandingan, komentar bahasa Indonesia, tonton di HP, smart TV, dan laptop.",
  alternates: { canonical: "/tentang" },
};

const STATS = [
  { value: "48", label: "Tim Peserta" },
  { value: "16", label: "Stadion Tuan Rumah" },
  { value: "104", label: "Pertandingan" },
  { value: "39", label: "Hari Turnamen" },
];

const FEATURES = [
  {
    title: "Live Streaming Gratis di BOLAKAMI",
    body: "Seluruh 104 pertandingan Piala Dunia 2026 disiarkan langsung di BolaKami tanpa biaya berlangganan. Fase grup gratis tanpa pendaftaran, babak knockout cukup akun BolaKami gratis dengan email atau Google.",
  },
  {
    title: "Komentar Bolakami Berbahasa Indonesia",
    body: "Tim komentator BolaKami memberikan narasi penuh dalam bahasa Indonesia — bukan dubbing, melainkan komentar langsung khas BolaKami dengan konteks lokal yang akrab bagi penggemar tanah air.",
  },
  {
    title: "Tonton Bolakami di Semua Perangkat",
    body: "Streaming BolaKami berjalan di HP Android & iOS lewat browser atau aplikasi, smart TV (Android TV, Apple TV, Chromecast, AirPlay), laptop, dan tablet. Kualitas BolaKami otomatis menyesuaikan dari 360p hingga 4K HDR.",
  },
  {
    title: "Highlight & Replay 7 Hari di BolaKami",
    body: "Highlight 5 menit tersedia 60 menit setelah peluit akhir, sementara replay pertandingan penuh tersimpan selama 7 hari di BolaKami. Setel pengingat kickoff lewat tombol bel di setiap halaman pertandingan BolaKami.",
  },
  {
    title: "Preview, Prediksi, & Analisis Taktik Bolakami",
    body: "Selain streaming, BolaKami menyajikan preview matchup per grup, profil 16 stadion tuan rumah, analisis taktik, dan kabar transfer pemain bintang menjelang turnamen. Semua artikel BolaKami ditulis dalam bahasa Indonesia.",
  },
  {
    title: "Update Kualifikasi Indonesia di Bolakami",
    body: "BolaKami memberikan liputan khusus perjalanan Timnas Garuda di babak ketiga kualifikasi Zona Asia — analisis setiap pertandingan dan peluang menuju playoff antar-konfederasi, hanya di BolaKami.",
  },
];

const TEAM = [
  {
    name: "Bayu Pratama",
    role: "Editor Utama",
    bio: "Mengulas format turnamen, profil stadion, dan matchup tim Eropa. Pengalaman 8 tahun meliput Piala Dunia & Liga Champions.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=bayupratama&backgroundColor=10b981",
  },
  {
    name: "Reza Wibowo",
    role: "Reporter Senior",
    bio: "Spesialis tim CONMEBOL dan AFC. Pernah meliput langsung Piala Dunia 2018 Rusia dan Qatar 2022.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=rezawibowo&backgroundColor=f59e0b",
  },
  {
    name: "Andra Mahesa",
    role: "Analis Taktik",
    bio: "Fokus tim Amerika Selatan dan CONCACAF. Menulis breakdown taktik dengan pendekatan data-driven.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=andramahesa&backgroundColor=3b82f6",
  },
  {
    name: "Putri Anggraini",
    role: "Reporter UEFA",
    bio: "Mengikuti perkembangan tim-tim Eropa Barat dari Prancis hingga Belanda. Lulusan jurnalistik olahraga.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=putrianggraini&backgroundColor=ec4899",
  },
  {
    name: "Dimas Setiawan",
    role: "Reporter Indonesia",
    bio: "Liputan khusus Timnas Indonesia dan Liga 1. Spesialis pemain diaspora dan generasi muda Garuda.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=dimassetiawan&backgroundColor=ef4444",
  },
];

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <header className="mb-14 text-center">
        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
          Tentang BOLAKAMI
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          <span className="text-primary">BOLAKAMI</span>: Hub Live Streaming
          Piala Dunia 2026
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Bolakami adalah platform independen berbahasa Indonesia yang fokus
          penuh pada Piala Dunia 2026. Lewat BolaKami, kamu bisa menonton
          turnamen 48 tim pertama dalam sejarah yang digelar di Amerika
          Serikat, Kanada, dan Meksiko — semuanya gratis di BolaKami.
        </p>
      </header>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-surface p-6 text-center"
            >
              <div className="text-4xl font-extrabold tabular-nums text-primary sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mb-16 rounded-2xl border border-border bg-surface p-8 md:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Misi Bolakami
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          Sepak bola adalah bahasa universal — tapi tidak semua orang punya
          akses ke turnamen terbesar di dunia. BolaKami hadir untuk memastikan
          setiap penggemar bola di Indonesia bisa menyaksikan Piala Dunia 2026
          tanpa hambatan. Di BolaKami, semua pertandingan gratis, berkomentar
          bahasa Indonesia, dan dapat ditonton di perangkat apa pun.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Lebih dari sekadar streaming, BolaKami menyajikan konteks: preview
          tim peserta, profil 16 stadion tuan rumah, prediksi juara, dan
          analisis taktik yang membantu kamu menikmati pertandingan dengan
          pemahaman lebih dalam. Inilah yang membedakan BolaKami dari sekadar
          situs live streaming biasa.
        </p>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Apa yang BolaKami Sajikan
        </h2>
        <p className="mb-8 max-w-2xl text-muted">
          Setiap fitur BolaKami dirancang khusus untuk pengalaman menonton
          Piala Dunia 2026 yang lebih baik bagi penggemar bola Indonesia.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="text-base font-bold text-primary">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Tim Redaksi BolaKami
        </h2>
        <p className="mb-8 max-w-2xl text-muted">
          Lima jurnalis dan analis sepak bola di balik konten BolaKami —
          mereka yang memastikan setiap preview, prediksi, dan ulasan di
          BolaKami akurat dan enak dibaca.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.avatar}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 rounded-full ring-2 ring-border"
                />
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-primary">
                    {m.role}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-16 rounded-2xl border border-border bg-surface p-8 md:p-10">
        <h2 className="text-xl font-extrabold tracking-tight">
          Catatan Hak BolaKami
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          BolaKami adalah platform independen dan tidak berafiliasi dengan
          FIFA, federasi nasional, atau penyelenggara liga manapun. Semua nama
          tim, kompetisi, dan logo yang ditampilkan di BolaKami adalah milik
          pemegang hak masing-masing dan digunakan secara editorial. Konten
          artikel BolaKami bersifat analisis dan opini.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-primary/30 bg-linear-to-br from-primary/10 to-transparent p-10 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Mulai Jelajahi Piala Dunia 2026 di BolaKami
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Baca preview matchup per grup di BolaKami, kenali tim peserta, dan
          tonton live streaming gratis di BolaKami menjelang kickoff 11 Juni
          2026.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="https://bolakamitv.up.railway.app/"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary-hover"
          >
            Lihat Jadwal Lengkap
          </Link>
          <Link
            href="https://bolakami.news/"
            className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground/85 transition-colors hover:border-primary/60 hover:text-primary"
          >
            Berita Bola Terkini
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted">
          Hubungi kami:{" "}
          <a
            href="mailto:support@bolakami.click"
            className="link-inline"
          >
            support@bolakami.click
          </a>
        </p>
      </section>
    </div>
  );
}
