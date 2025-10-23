import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixabay.com",
      },
      {
        protocol: "https",
        hostname: "**.pixabay.com", // for all subdomains
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ allow Cloudinary
      },
    ],
  },
};

export default nextConfig;
