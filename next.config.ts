import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

// export default withPWA({
//   ...nextConfig,
//   pwa: {
//     dest: "public",
//     disable: process.env.NODE_ENV === "development",
//   },
// });
