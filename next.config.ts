import type { NextConfig } from "next"
import { RemotePattern } from "next/dist/shared/lib/image-config"

const PRODUCTION_REMOTE_PATTERNS = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
]
const DEFAULT_REMOTE_PATTERNS = [
  {
    hostname: process.env.API_HOSTNAME ?? "localhost",
  },
]

const nextConfig: NextConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const remotePatterns: Array<URL | RemotePattern> = isDevelopment
    ? [...DEFAULT_REMOTE_PATTERNS]
    : [...DEFAULT_REMOTE_PATTERNS, ...PRODUCTION_REMOTE_PATTERNS]

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
