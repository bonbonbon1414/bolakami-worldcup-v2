"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/grup", label: "Grup" },
  { href: "/berita", label: "Berita" },
  { href: "/tentang", label: "Tentang" },
];

const LOGO_URL =
  "https://pub-152057235af540e0af1635a3863a9fba.r2.dev/logo-bolakami-BZH4nO91.png";

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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            alt="BolaKami"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:bg-surface hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://nonton.blkmi.com"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-black transition-colors hover:bg-primary-hover md:inline-flex"
        >
          <LiveDot />
          Streaming Bola Gratis
        </Link>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary md:hidden"
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

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-semibold text-foreground/85 hover:bg-surface hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#popular"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-black hover:bg-primary-hover"
            >
              <LiveDot />
              Nonton Live
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
