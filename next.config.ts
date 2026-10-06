import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "symart.com.mx",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
