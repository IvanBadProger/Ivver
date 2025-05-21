import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [new URL("https://images.unsplash.com/**")],
    // domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
}
export default nextConfig
