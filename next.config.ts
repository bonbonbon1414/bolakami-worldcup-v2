import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emit a fully static site into ./out (served by Nginx, no Node runtime).
  output: "export",
  // Static hosts can't do Next's on-the-fly image optimization.
  // (Project uses plain <img>, so this is just a safeguard.)
  images: { unoptimized: true },
};

export default nextConfig;
