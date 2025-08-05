/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/portfolio',
  transpilePackages: ['framer-motion'],
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
