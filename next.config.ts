import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const base = backend.replace(/\/api\/?$/, "") || "http://localhost:5000";
    return [{ source: "/api/:path*", destination: `${base}/api/:path*` }];
  },
};

export default nextConfig;
