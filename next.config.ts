import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fakestoreapi.com"], // Allow images from this domain
  },
  // You can add other config options here if needed
};

export default nextConfig;
