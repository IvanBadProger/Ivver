import type { NextConfig } from "next"
import { RemotePattern } from "next/dist/shared/lib/image-config"

const nextConfig: NextConfig = () => {
  const remotePatterns: Array<URL | RemotePattern> = [
    {
      hostname: process.env.API_HOSTNAME ?? "localhost",
    },
  ]

  if (process.env.NODE_ENV === "development") {
    remotePatterns.push({
      protocol: "https",
      hostname: "images.unsplash.com",
    })
  }

  return {
    images: {
      remotePatterns,
    },
    experimental: {
      serverActions: {
        bodySizeLimit: "15mb",
      },
    },
  }
}
export default nextConfig
