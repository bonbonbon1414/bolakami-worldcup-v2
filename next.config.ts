import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Project uses plain <img>, so skip Next's image optimizer.
  images: { unoptimized: true },
};

export default nextConfig;

// Makes Cloudflare bindings (env, etc.) available during `next dev`.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
