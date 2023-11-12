/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages:['mongoose']
    },

    images: {
      domains: ['images.unsplash.com'],
    },
}

module.exports = nextConfig
