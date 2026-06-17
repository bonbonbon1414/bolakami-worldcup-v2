const DATE_LONG = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const DATE_SHORT = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const TIME_HHMM = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatDateLong(iso: string): string {
  return DATE_LONG.format(new Date(iso));
}

export function formatDateShort(iso: string): string {
  return DATE_SHORT.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return TIME_HHMM.format(new Date(iso)) + " WIB";
}

export function dayLabel(dayOffset: number): string {
  if (dayOffset === 0) return "Hari Ini";
  if (dayOffset === 1) return "Besok";
  if (dayOffset === -1) return "Kemarin";
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(d);
}
