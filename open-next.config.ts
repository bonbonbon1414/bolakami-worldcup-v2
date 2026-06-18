import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config — no R2 incremental cache (the app has no ISR pages and the
// live-score route is force-dynamic). Add an incremental-cache override later
// if you introduce ISR/data-cache that needs to persist across requests.
export default defineCloudflareConfig();
