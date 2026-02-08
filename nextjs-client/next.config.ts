import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  }
};

export default nextConfig;
