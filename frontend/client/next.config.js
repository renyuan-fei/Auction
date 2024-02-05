/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: [
        'cdn.pixabay.com',
    ]
  }
}

module.exports = nextConfig
