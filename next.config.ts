import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // GitHub Pages serves this repository from /MY-WEBSITE/, not from the domain root.
  output: "export",
  basePath: isGitHubPages ? "/MY-WEBSITE" : "",
  trailingSlash: true,
  // A static export has no Next image-optimization server; use the source image URL directly.
  images: {
    unoptimized: true,
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
