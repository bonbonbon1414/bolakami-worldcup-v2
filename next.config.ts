import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Project uses plain <img>, so skip Next's image optimizer.
  images: { unoptimized: true },
};

export default nextConfig;
