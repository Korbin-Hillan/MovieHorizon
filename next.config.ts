import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https', // Allows all HTTPS images
        hostname: '**', // Allows any domain
      },
    ],
  },
};

export default nextConfig;