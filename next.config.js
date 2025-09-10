import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env/client.ts");
await jiti.import("./src/env/server.ts");

/** @type {import('next').NextConfig} */
export default {
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
