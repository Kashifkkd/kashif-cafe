import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com", pathname: "/**", protocol: "https" },
      { hostname: "images.pexels.com", pathname: "/**", protocol: "https" },
      { hostname: "videos.pexels.com", pathname: "/**", protocol: "https" },
      { hostname: "assets.mixkit.co", pathname: "/**", protocol: "https" },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
