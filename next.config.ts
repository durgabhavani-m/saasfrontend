import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Server-side proxy to backend to avoid browser CORS issues.
    // Configure BACKEND_URL on Vercel (e.g. https://saasbackend-p8k8.onrender.com)
    // Local dev fallback: http://localhost:5000
    const backend = process.env.BACKEND_URL || "http://localhost:5000";
    const base = backend.replace(/\/api\/?$/, "").replace(/\/$/, "") || "http://localhost:5000";
    return [{ source: "/api/:path*", destination: `${base}/api/:path*` }];
  },
};

export default nextConfig;
