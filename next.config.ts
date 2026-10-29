import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // Static export is enabled only for the GitHub Pages workflow. Other hosts retain
  // the normal Next.js runtime, including the request-time YouTube API route.
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/MY-WEBSITE",
        trailingSlash: true,
      }
    : {}),
  images: {
    ...(isGitHubPages ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "amanmalu.me",
        pathname: "/_next/image",
      },
    ],
  },
};

export default nextConfig;
