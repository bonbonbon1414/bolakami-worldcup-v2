import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config — no R2 incremental cache (the app has no ISR pages and the
// live-score route is force-dynamic). Add an incremental-cache override later
// if you introduce ISR/data-cache that needs to persist across requests.
const config = defineCloudflareConfig();

// Build Next.js directly instead of OpenNext's default `npm run build`, so the
// `build` npm script can run the OpenNext build without recursing into itself.
config.buildCommand = "npx next build";

export default config;
