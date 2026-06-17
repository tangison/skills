import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Strict build — fail on TypeScript errors (was previously ignoreBuildErrors: true).
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
