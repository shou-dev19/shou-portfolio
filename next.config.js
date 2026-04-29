/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/portfolio',
  transpilePackages: ['framer-motion'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ytimg.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portfolio',
        basePath: false,
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
