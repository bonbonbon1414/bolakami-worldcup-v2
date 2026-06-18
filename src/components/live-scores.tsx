"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Side = { name: string; image: string | null; goals: number | null };
type Match = {
  id: number;
  league: string;
  startingAt: string;
  state: string;
  stateName: string;
  live: boolean;
  minute: number | null;
  home: Side;
  away: Side;
};
type ApiResponse = {
  date: string;
  updatedAt: string;
  count: number;
  matches: Match[];
};

type Tab = "all" | "finished" | "scheduled";

const REFRESH_MS = 30_000;
const JKT = "Asia/Jakarta";

// SportMonks state codes for matches that have ended / won't be played.
const FINISHED_STATES = new Set([
  "FT",
  "AET",
  "FT_PEN",
  "AWARDED",
  "WO",
  "CANCL",
  "POSTP",
  "ABAN",
  "SUSP",
  "DELETED",
]);

const isFinished = (m: Match) => FINISHED_STATES.has(m.state);
const isScheduled = (m: Match) => m.state === "NS";

function todayJkt(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: JKT,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// SportMonks returns starting_at in WIB wall-clock (e.g. "2026-06-17 03:00:00").
function kickoffHM(iso: string): string {
  const m = iso.match(/\d{4}-\d{2}-\d{2}[ T](\d{2}):(\d{2})/);
  return m ? `${m[1]}:${m[2]}` : "";
}

function updatedHM(iso: string): string {
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: JKT,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(dt);
}

function statusText(m: Match): string {
  if (m.live) return m.minute != null ? `${m.minute}'` : "LIVE";
  if (isFinished(m)) return m.state === "FT" ? "FT" : m.stateName || m.state;
  if (isScheduled(m)) return kickoffHM(m.startingAt);
  return m.stateName || m.state;
}

// --- icons ---

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8 2v4M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

// --- small presentational pieces ---

function Crest({ side, align }: { side: Side; align: "left" | "right" }) {
  return (
    <span
      className={`grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 ${
        align === "right" ? "order-last" : ""
      }`}
    >
      {side.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={side.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-[10px] font-bold text-muted">
          {side.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}

function MatchRow({ m }: { m: Match }) {
  const hasScore = m.home.goals != null && m.away.goals != null;
  return (
    <li className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface-2/40">
      {/* status */}
      <span
        className={`grid w-14 shrink-0 place-items-center rounded-md px-1.5 py-1 text-xs font-bold tabular-nums ${
          m.live ? "bg-danger/15 text-danger" : "bg-surface-2 text-muted"
        }`}
      >
        {m.live ? (
          <span className="inline-flex items-center gap-1">
            <span className="live-dot" aria-hidden />
            {statusText(m)}
          </span>
        ) : (
          statusText(m)
        )}
      </span>

      {/* teams + score */}
      <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex min-w-0 items-center justify-end gap-2">
          <span className="truncate text-right text-sm font-semibold text-foreground/90">
            {m.home.name}
          </span>
          <Crest side={m.home} align="right" />
        </div>
        <span className="min-w-[3rem] rounded-md bg-surface-2 px-2.5 py-1 text-center text-sm font-extrabold tabular-nums text-foreground">
          {hasScore ? `${m.home.goals} - ${m.away.goals}` : "–"}
        </span>
        <div className="flex min-w-0 items-center justify-start gap-2">
          <Crest side={m.away} align="left" />
          <span className="truncate text-sm font-semibold text-foreground/90">
            {m.away.name}
          </span>
        </div>
      </div>
    </li>
  );
}

function SkeletonRow() {
  return (
    <li className="px-3 py-2.5">
      <div className="media-skeleton h-7 rounded-md" />
    </li>
  );
}

// --- main widget ---

export function LiveScores() {
  // Fixed to today (WIB); no date navigation.
  const [date] = useState(todayJkt);
  const [tab, setTab] = useState<Tab>("all");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const load = useCallback(async (ymd: string, signal?: AbortSignal) => {
    try {
      const res = await fetch(`/api/livescores?date=${ymd}`, {
        signal,
        cache: "no-store",
      });
      // The Worker API doesn't exist under `next dev` — treat as "no matches"
      // rather than an error so the section stays clean during local dev.
      if (res.status === 404) {
        setData({ date: ymd, updatedAt: "", count: 0, matches: [] });
        setStatus("ready");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as ApiResponse;
      setData(json);
      setStatus("ready");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setStatus((s) => (s === "ready" ? "ready" : "error"));
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    // Defer the initial fetch out of the effect body so its setState doesn't
    // run synchronously during the effect; then poll on an interval.
    const kickoff = setTimeout(() => load(date, ctrl.signal), 0);
    const id = setInterval(() => load(date), REFRESH_MS);
    return () => {
      ctrl.abort();
      clearTimeout(kickoff);
      clearInterval(id);
    };
  }, [date, load]);

  const matches = useMemo(() => data?.matches ?? [], [data]);
  const counts = useMemo(
    () => ({
      all: matches.length,
      finished: matches.filter(isFinished).length,
      scheduled: matches.filter(isScheduled).length,
    }),
    [matches],
  );
  const visible = useMemo(() => {
    if (tab === "finished") return matches.filter(isFinished);
    if (tab === "scheduled") return matches.filter(isScheduled);
    return matches;
  }, [matches, tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "Semua" },
    { key: "finished", label: "Selesai" },
    { key: "scheduled", label: "Jadwal" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {/* tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border p-3">
        <div className="flex items-center gap-1 rounded-lg bg-surface-2/60 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                tab === t.key
                  ? "bg-primary text-black"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.label}
              <span
                className={`rounded px-1.5 text-[10px] tabular-nums ${
                  tab === t.key ? "bg-black/20" : "bg-surface text-muted"
                }`}
              >
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* competition group header */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2/30 px-3 py-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary">
          <TrophyIcon className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-extrabold">World Cup</span>
        <span className="ml-auto text-xs text-muted">Piala Dunia 2026</span>
      </div>

      {/* body */}
      {status === "loading" ? (
        <ul className="divide-y divide-border">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </ul>
      ) : status === "error" && !data ? (
        <div className="p-8 text-center text-sm text-foreground/85">
          Gagal memuat data pertandingan. Coba lagi beberapa saat.
        </div>
      ) : matches.length === 0 ? (
        <div className="p-10 text-center">
          <CalendarIcon className="mx-auto h-9 w-9 text-muted" />
          <p className="mt-3 font-semibold text-foreground">
            Tidak ada pertandingan Piala Dunia 2026 hari ini.
          </p>
          <p className="mt-1 text-sm text-muted">
            Skor & jadwal akan tampil di sini saat ada laga.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted">
          Tidak ada pertandingan untuk filter ini.
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {visible.map((m) => (
            <MatchRow key={m.id} m={m} />
          ))}
        </ul>
      )}

      {/* footer */}
      {data?.updatedAt ? (
        <div className="border-t border-border px-3 py-2 text-center text-[11px] text-muted">
          Diperbarui {updatedHM(data.updatedAt)} WIB · otomatis tiap 30 detik
        </div>
      ) : null}
    </div>
  );
}
