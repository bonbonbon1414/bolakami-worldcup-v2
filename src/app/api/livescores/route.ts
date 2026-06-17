/**
 * GET /api/livescores?date=YYYY-MM-DD
 *
 * Returns that day's World Cup fixtures (scheduled, live, finished) in WIB,
 * proxying SportMonks server-side so the API token (from .env) never reaches
 * the browser. Defaults to today (Asia/Jakarta) when `date` is missing/invalid.
 */

// Runs per-request (reads process.env + a query param) — never prerendered.
export const dynamic = "force-dynamic";

const SPORTMONKS_BASE = "https://api.sportmonks.com/v3/football";
const UPSTREAM_REVALIDATE_SECONDS = 20;
const MAX_MATCHES = 30;

// SportMonks state codes that mean "the ball is rolling".
const LIVE_STATES = new Set([
  "INPLAY",
  "1ST_HALF",
  "2ND_HALF",
  "HT",
  "ET",
  "ET_BREAK",
  "BREAK",
  "EXTRA_TIME",
  "PEN_LIVE",
  "PENALTIES",
]);

export async function GET(request: Request): Promise<Response> {
  const token = process.env.SPORTMONKS_API_TOKEN;
  if (!token) {
    return Response.json(
      { error: "Server is missing SPORTMONKS_API_TOKEN" },
      { status: 500 },
    );
  }
  const leagueId = process.env.WORLD_CUP_LEAGUE_ID ?? "732";

  const dateParam = new URL(request.url).searchParams.get("date");
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateParam ?? "")
    ? (dateParam as string)
    : dateInJakarta(0);

  const api = new URL(`${SPORTMONKS_BASE}/fixtures/date/${date}`);
  api.searchParams.set("api_token", token);
  api.searchParams.set("include", "participants;scores;state;league;periods");
  // Group + time the fixtures in WIB so they match the date the user picked.
  api.searchParams.set("timezone", "Asia/Jakarta");

  let upstream: Response;
  try {
    upstream = await fetch(api.toString(), {
      headers: { Accept: "application/json" },
      // Cache the upstream call briefly so rapid polling stays within limits.
      next: { revalidate: UPSTREAM_REVALIDATE_SECONDS },
    });
  } catch {
    return Response.json({ error: "Failed to reach SportMonks" }, { status: 502 });
  }

  if (!upstream.ok) {
    return Response.json(
      { error: `SportMonks responded ${upstream.status}` },
      { status: 502 },
    );
  }

  const payload = (await upstream.json()) as { data?: RawFixture[] };
  const all = Array.isArray(payload.data) ? payload.data : [];
  const matches = all
    .filter((fx) => isWorldCup(fx, leagueId))
    .map(normalize)
    .sort((a, b) => (a.startingAt < b.startingAt ? -1 : 1))
    .slice(0, MAX_MATCHES);

  return Response.json({
    date,
    updatedAt: new Date().toISOString(),
    count: matches.length,
    matches,
  });
}

// A date `offsetDays` from now, as YYYY-MM-DD in WIB (en-CA formats ISO-style).
function dateInJakarta(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

type RawFixture = {
  id: number;
  starting_at?: string;
  league_id?: number;
  league?: { id?: number; name?: string };
  state?: { state?: string; name?: string; developer_name?: string };
  participants?: Array<{
    name?: string;
    image_path?: string;
    meta?: { location?: "home" | "away" };
  }>;
  scores?: Array<{
    description?: string;
    score?: { goals?: number; participant?: "home" | "away" };
  }>;
  periods?: Array<{ ticking?: boolean; minutes?: number }>;
};

function isWorldCup(fx: RawFixture, leagueId: string): boolean {
  const idMatch = String(fx.league?.id ?? fx.league_id ?? "") === leagueId;
  const nameMatch = /world cup|piala dunia/i.test(fx.league?.name ?? "");
  return idMatch || nameMatch;
}

function normalize(fx: RawFixture) {
  const participants = fx.participants ?? [];
  const home = participants.find((p) => p.meta?.location === "home");
  const away = participants.find((p) => p.meta?.location === "away");
  const goals = (loc: "home" | "away"): number | null => {
    const s = (fx.scores ?? []).find(
      (x) => x.description === "CURRENT" && x.score?.participant === loc,
    );
    return s?.score?.goals ?? null;
  };
  const state = fx.state ?? {};
  const stateCode = state.state ?? state.developer_name ?? "NS";
  const ticking = (fx.periods ?? []).find((p) => p.ticking);
  return {
    id: fx.id,
    league: fx.league?.name ?? "World Cup",
    startingAt: fx.starting_at ?? "",
    state: stateCode,
    stateName: state.name ?? "",
    live: LIVE_STATES.has(stateCode),
    minute: ticking?.minutes ?? null,
    home: {
      name: home?.name ?? "TBD",
      image: home?.image_path ?? null,
      goals: goals("home"),
    },
    away: {
      name: away?.name ?? "TBD",
      image: away?.image_path ?? null,
      goals: goals("away"),
    },
  };
}
