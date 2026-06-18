import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL, SITE_NAME, LOGO_URL } from "@/lib/site";

// Self-hosted Mont — the project's brand sans. Paths resolve relative to this file.
const mont = localFont({
  variable: "--font-mont",
  display: "swap",
  src: [
    { path: "../../public/fonts/Mont/MONT-THIN.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-THINITALIC.ttf", weight: "100", style: "italic" },
    { path: "../../public/fonts/Mont/MONT-EXTRALIGHT.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-EXTRALIGHTITALIC.ttf", weight: "200", style: "italic" },
    { path: "../../public/fonts/Mont/MONT-LIGHT.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-LIGHTITALIC.ttf", weight: "300", style: "italic" },
    { path: "../../public/fonts/Mont/MONT-REGULAR.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-REGULARITALIC.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Mont/MONT-SEMIBOLD.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-SEMIBOLDITALIC.ttf", weight: "600", style: "italic" },
    { path: "../../public/fonts/Mont/MONT-BOLD.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-BOLDITALIC.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/Mont/MONT-HEAVY.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-HEAVYITALIC.ttf", weight: "800", style: "italic" },
    { path: "../../public/fonts/Mont/MONT-BLACK.ttf", weight: "900", style: "normal" },
    { path: "../../public/fonts/Mont/MONT-BLACKITALIC.ttf", weight: "900", style: "italic" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TITLE =
  "Bolakami | Berita Bola Terbaru dan Jadwal Piala Dunia Hari Ini";
const SITE_DESCRIPTION =
  "Saksikan seluruh laga Piala Dunia 2026 gratis di Bolakami: komentar Indonesia, multi-angle, highlight & replay 7 hari. Streaming lancar di semua perangkat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | BolaKami",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Sports",
  keywords: [
    "live streaming piala dunia 2026",
    "live streaming bola",
    "nonton bola",
    "bolakami apk",
    "nonton bola gratis",
    "jadwal piala dunia 2026",
    "streaming bola gratis",
    "live streaming sepak bola",
    "world cup 2026 streaming",
    "piala dunia 48 tim",
    "bolakami",
    "bolakami live streaming",
    "nonton piala dunia indonesia",
    "fifa world cup 2026",
    "messi",
    "mbappe",
    "vinicius",
    "indonesia piala dunia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://pub-152057235af540e0af1635a3863a9fba.r2.dev/Profile-Bolakami.jpg",
        secureUrl:
          "https://pub-152057235af540e0af1635a3863a9fba.r2.dev/Profile-Bolakami.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 1200,
        alt: "Bolakami — Live Streaming Gratis Piala Dunia 2026 dengan Komentar Bahasa Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@Bolakamiofc",
    creator: "@Bolakamiofc",
    images: ["https://pub-152057235af540e0af1635a3863a9fba.r2.dev/Profile-Bolakami.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${mont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: LOGO_URL,
              description: SITE_DESCRIPTION,
              sameAs: [
                "https://www.facebook.com/bolakamiofc",
                "https://www.instagram.com/bolakamiofficial2/",
                "https://x.com/Bolakamiofc",
                "https://www.tiktok.com/@bolakami",
                "https://t.me/bolakamiofficial",
                "https://www.threads.com/@bolakamiofficial2",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              inLanguage: "id-ID",
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                logo: { "@type": "ImageObject", url: LOGO_URL },
              },
            }),
          }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />

        {/* Histats.com tracker — the visible counter div is rendered inside SiteFooter */}
        <Script id="histats-tracker" strategy="afterInteractive">
          {`
            var _Hasync = _Hasync || [];
            _Hasync.push(['Histats.start', '1,5010871,4,429,112,75,00011111']);
            _Hasync.push(['Histats.fasi', '1']);
            _Hasync.push(['Histats.track_hits', '']);
            (function() {
              var hs = document.createElement('script');
              hs.type = 'text/javascript';
              hs.async = true;
              hs.src = '//s10.histats.com/js15_as.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
            })();
          `}
        </Script>
        <noscript>
          <a href="/" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="//sstatic1.histats.com/0.gif?5010871&101"
              alt="counter statistics"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
        </noscript>
      </body>
    </html>
  );
}
