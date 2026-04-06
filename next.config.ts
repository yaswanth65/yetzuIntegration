import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://productionyetzuapi.yetzu.com/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "productionyetzuapi.yetzu.com",
      },
      {
        protocol: "https",
        hostname: "yetzu.com",
      },
      {
        protocol: "http",
        hostname: "157.173.220.125",
      },
    ],
    unoptimized: true, // Important if you serve static images from public/
  },
  outputFileTracingRoot: __dirname, // Fix Next.js workspace root warning
};

export default nextConfig;
