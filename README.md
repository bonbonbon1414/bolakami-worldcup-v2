# Bolakami — World Cup 2026

A Next.js (App Router) site for Piala Dunia 2026: news/preview articles, schedule
by group, and **live scores** powered by the SportMonks API. Indonesian-language,
dark "broadcast" theme, deployed on **Cloudflare Workers** via OpenNext.

## Tech stack

- **Next.js 16** (App Router, React 19, React Compiler)
- **Tailwind CSS v4**
- **MDX content** parsed with `gray-matter` + `remark` (no DB)
- **SportMonks** football API for live scores (server-side proxy)
- **Cloudflare Workers** via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
- Self-hosted **Mont** font (`next/font/local`)

## Project structure

```text
content/posts/        # article content as .mdx (filename = URL slug)
src/app/              # routes: /, /jadwal, /grup, /berita, /berita/[slug], /tentang
src/app/api/livescores/route.ts   # SportMonks proxy (reads SPORTMONKS_API_TOKEN)
src/app/sitemap.ts, robots.ts     # generated /sitemap.xml and /robots.txt
src/components/       # header, footer, cards, live scores, FAQ, etc.
src/lib/              # posts (MDX loader), leagues, date format, site config
public/fonts/Mont/    # self-hosted font files
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Note: the `/api/livescores` route needs `SPORTMONKS_API_TOKEN`. Copy
> `.env.example` to `.env` and fill it in. Without it the live-score section
> shows an empty state (the rest of the site works fine).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SPORTMONKS_API_TOKEN` | yes | SportMonks API token (server-side only — never exposed to the client) |
| `WORLD_CUP_LEAGUE_ID` | no | SportMonks league id for the World Cup (default `732`) |

- **Local dev (`next dev`):** read from `.env` / `.env.local`.
- **Local Workers preview (`npm run preview`):** read from `.dev.vars`.
- **Production (Cloudflare):** `WORLD_CUP_LEAGUE_ID` is set in `wrangler.jsonc`;
  the token is a secret — `npx wrangler secret put SPORTMONKS_API_TOKEN`.

`SITE_URL` (canonical domain, used by metadata + sitemap + robots) lives in
`src/lib/site.ts`.

## Adding an article

Create a file in `content/posts/`, e.g. `tim-a-vs-tim-b-grup-x-piala-dunia-2026.mdx`.
The filename becomes the slug. Frontmatter:

```yaml
---
title: "Preview Grup X: Tim A vs Tim B, ..."
description: "..."            # SEO meta description
date: "2026-05-20"           # ISO date
author: "Nama Penulis"
category: "piala-dunia"
cover: "https://.../cover.jpg" # optional — omit for the gradient fallback
tags: ["tim-a", "tim-b", "grup-x", "piala-dunia"]
featured: true                # optional — surfaces in "Pilihan Editor"
---
```

Posts auto-appear in Berita, the matching Jadwal/Grup section (via the `grup-*`
tag), the homepage Popular filter, and the sitemap. No rebuild config needed.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Next.js production build |
| `npm run start` | Run the Node production build locally |
| `npm run lint` | ESLint |
| `npm run preview` | Build with OpenNext + run the Worker locally (workerd) |
| `npm run deploy` | Build with OpenNext + deploy to Cloudflare |

## Deploy to Cloudflare

```bash
npx wrangler login                            # one-time
npx wrangler secret put SPORTMONKS_API_TOKEN  # set the token as a secret
npm run deploy
```

Config: [`wrangler.jsonc`](wrangler.jsonc) + [`open-next.config.ts`](open-next.config.ts).
After the first deploy, attach the custom domain (`developers-fun.com`) to the
Worker in the Cloudflare dashboard.
