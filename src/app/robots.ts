import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: 'https://www.shou-devlog.com/portfolio/sitemap.xml',
});

export default robots;
