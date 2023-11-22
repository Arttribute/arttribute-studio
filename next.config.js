/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ipfs.w3s.link",
      },
    ],
    domains: [
      "images.unsplash.com",
      "github.com",
      "cdn1.iconfinder.com",
      "api.astria.ai",
    ],
  },
};

module.exports = nextConfig;
