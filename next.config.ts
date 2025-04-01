// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  skipTrailingSlashRedirect: true,
  // Remove the skipApiRoutes and exportPathMap options
};

export default nextConfig;