import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jstales.com',
      },
      {
        protocol: 'https',
        hostname: 'old.jstales.com',
      },
    ],
  },
};

export default nextConfig;
