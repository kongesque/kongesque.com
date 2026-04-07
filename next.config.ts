import type { NextConfig } from "next";

// next.config.js
const nextConfig: NextConfig = {
  images: {
    domains: ['www.kongesque.com'],
  },
  async redirects() {
    return [
      {
        source: '/introducing-locus',
        destination: '/locus-vision',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
