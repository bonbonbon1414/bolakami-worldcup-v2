export type League = {
  slug: string;
  name: string;
  shortName: string;
  country: string;
  emoji: string;
  color: string;
};

export const LEAGUES: League[] = [
  {
    slug: "liga-inggris",
    name: "Premier League",
    shortName: "Liga Inggris",
    country: "England",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    color: "#3d195b",
  },
  {
    slug: "la-liga",
    name: "LaLiga",
    shortName: "La Liga",
    country: "Spain",
    emoji: "🇪🇸",
    color: "#ee8707",
  },
  {
    slug: "serie-a",
    name: "Serie A",
    shortName: "Serie A",
    country: "Italy",
    emoji: "🇮🇹",
    color: "#008fd7",
  },
  {
    slug: "bundesliga",
    name: "Bundesliga",
    shortName: "Bundesliga",
    country: "Germany",
    emoji: "🇩🇪",
    color: "#d20515",
  },
  {
    slug: "ligue-1",
    name: "Ligue 1",
    shortName: "Ligue 1",
    country: "France",
    emoji: "🇫🇷",
    color: "#091c3e",
  },
  {
    slug: "liga-champions",
    name: "UEFA Champions League",
    shortName: "Liga Champions",
    country: "Europe",
    emoji: "🏆",
    color: "#001489",
  },
  {
    slug: "liga-1",
    name: "BRI Liga 1",
    shortName: "Liga 1 Indonesia",
    country: "Indonesia",
    emoji: "🇮🇩",
    color: "#e30613",
  },
  {
    slug: "piala-dunia",
    name: "FIFA World Cup",
    shortName: "Piala Dunia",
    country: "World",
    emoji: "🌍",
    color: "#0e7f3a",
  },
];

export function getLeague(slug: string): League | undefined {
  return LEAGUES.find((l) => l.slug === slug);
}
