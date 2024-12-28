import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['store.storeimages.cdn-apple.com'],
  },
};

export default nextConfig;
