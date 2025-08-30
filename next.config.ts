import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      new URL("http://localhost:8000/storage/**"),
      new URL("https://api.arthive.foo/storage/**"),
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
