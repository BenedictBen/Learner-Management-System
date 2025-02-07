// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Exclude NextAuth routes from being rewritten:
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*",
      },
      // All other API routes get rewritten to your backend:
      {
        source: "/api/:path*",
        destination: "https://tmp-se-project.azurewebsites.net/api/:path*",
      },
    ];
  },
};

export default nextConfig;
