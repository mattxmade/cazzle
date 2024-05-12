/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7 * 4, // 4 weeks
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.CONVEX_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
    imageSizes: [320],
  },
  experimental: {
    taint: true, // [1]
  },
};

module.exports = nextConfig;

// Next.js Taint
// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#preventing-sensitive-data-from-being-exposed-to-the-client
