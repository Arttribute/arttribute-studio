/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },

  images: {
    domains: ["images.unsplash.com", "github.com", "cdn1.iconfinder.com"],
  },
};

module.exports = nextConfig;
