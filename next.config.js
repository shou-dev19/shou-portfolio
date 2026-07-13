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
      {
        source: '/robots.txt',
        destination: '/portfolio/robots.txt',
        basePath: false,
        permanent: true,
      },
      {
        source: '/sitemap.xml',
        destination: '/portfolio/sitemap.xml',
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
