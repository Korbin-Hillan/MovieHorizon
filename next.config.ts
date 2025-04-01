import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Add this line to enable static export
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any domain
      },
    ],
  },
};

export default nextConfig;