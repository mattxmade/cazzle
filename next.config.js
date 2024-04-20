/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.CONVEX_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
    imageSizes: [320],
  },
};

module.exports = nextConfig;
