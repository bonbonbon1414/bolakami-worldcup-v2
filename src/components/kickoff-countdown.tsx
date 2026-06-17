"use client";

import { useEffect, useState } from "react";

// Opening match of Piala Dunia 2026 — Estadio Azteca, Meksiko.
// Stored as a fixed instant so server and client agree on the target.
const KICKOFF = new Date("2026-06-11T02:00:00Z");

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getRemaining(now: number): Remaining {
  const diff = KICKOFF.getTime() - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[2ch] rounded-md bg-surface-2 px-2 py-1 text-lg font-extrabold tabular-nums text-foreground sm:text-xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}

export function KickoffCountdown() {
  // Render nothing on the server / first paint to avoid a hydration mismatch,
  // then tick once mounted on the client.
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setTime(getRemaining(Date.now()));
    // Defer the first update out of the effect body (avoids a sync setState),
    // then tick every second.
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  // Reserve height so the layout doesn't shift when the countdown mounts.
  if (!time) {
    return <div aria-hidden className="h-13" />;
  }

  if (time.done) {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2">
        <span className="live-dot" />
        <span className="text-sm font-extrabold uppercase tracking-wide text-foreground">
          Live sekarang
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3"
      role="timer"
      aria-label={`Kickoff Piala Dunia 2026 dalam ${time.days} hari ${time.hours} jam ${time.minutes} menit`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        Kickoff dalam
      </span>
      <div className="flex items-center gap-2">
        <Unit value={time.days} label="Hari" />
        <Unit value={time.hours} label="Jam" />
        <Unit value={time.minutes} label="Menit" />
        <Unit value={time.seconds} label="Detik" />
      </div>
    </div>
  );
}
