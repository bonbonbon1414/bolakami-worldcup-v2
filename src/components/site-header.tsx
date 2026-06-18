"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const WATCH_URL = "https://nonton.blkmi.com";
const LOGO_URL =
  "https://pub-152057235af540e0af1635a3863a9fba.r2.dev/Profile-Bolakami.jpg";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/grup", label: "Grup" },
  { href: "/berita", label: "Berita" },
  { href: "/tentang", label: "Tentang" },
];

function LiveDot() {
  return (
    <span className="relative inline-block h-2 w-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-danger opacity-75" />
      <span className="absolute inset-0 rounded-full bg-danger" />
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      {/* Floating pill bar */}
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border bg-surface/80 px-3 shadow-lg shadow-black/40 backdrop-blur-md sm:px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            alt="BolaKami"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            BOLAKAMI
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/80 hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={WATCH_URL}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-black outline-none transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:inline-flex"
        >
          <LiveDot />
          Streaming Bola Gratis
        </Link>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground/80 outline-none transition-colors hover:border-primary/60 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Floating mobile menu */}
      {open ? (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-surface/95 p-2 shadow-lg shadow-black/40 backdrop-blur-md md:hidden">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/85 hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={WATCH_URL}
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-black hover:bg-primary-hover"
          >
            <LiveDot />
            Streaming Bola Gratis
          </Link>
        </div>
      ) : null}
    </header>
  );
}
