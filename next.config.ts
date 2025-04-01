import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Allows all HTTPS images
        hostname: '**', // Allows any domain
      },
    ],
  },
};

export default nextConfig;
