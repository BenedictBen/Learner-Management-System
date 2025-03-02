// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // compress: true,
  // images: {
  //   domains: ['res.cloudinary.com'],
  // },
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Adjust if specific paths are required
      },
      {
        protocol: "https",
        hostname: "example.com", // Add this pattern
        pathname: "/**",
      },
    ],
    domains: ["localhost", "example.com"],

  },
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




