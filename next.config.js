/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/map',
        destination: '/map/UNF',
        permanent: true,
      },
    ]
  },
  reactStrictMode: false,
}

module.exports = nextConfig
