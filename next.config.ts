import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tmp-se-project.azurewebsites.net/api/:path*", // Backend URL
      },
    ];
  },
};

export default nextConfig;
