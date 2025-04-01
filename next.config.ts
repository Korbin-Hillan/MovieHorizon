import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Add this line to enable static export
  images: {
    unoptimized: true, // Add this line for static image export
    remotePatterns: [
      {
        protocol: 'https', // Allows all HTTPS images
        hostname: '**', // Allows any domain
      },
    ],
  },
  // Skip NextAuth API routes during static export
  skipTrailingSlashRedirect: true,
  skipApiRoutes: true,
};

export default nextConfig;