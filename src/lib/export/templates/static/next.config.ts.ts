// next.config.ts for the exported project. The remotePatterns entry covers
// the Unsplash CDN that the AI generator pulls from; image mode B leaves
// these URLs intact and Next will optimize them at request time.

export function nextConfigTs(): string {
  return `import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default config;
`;
}
