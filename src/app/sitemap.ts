import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.shou-devlog.com/portfolio';
const projectsDirectory = path.join(process.cwd(), '_contents/projects');

const sitemap = (): MetadataRoute.Sitemap => {
  const projectPages = fs.readdirSync(projectsDirectory).map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(path.join(projectsDirectory, fileName), 'utf8');
    const { data } = matter(fileContents);

    return {
      url: `${siteUrl}/projects/${id}`,
      lastModified: data.date as string,
    };
  });

  return [{ url: siteUrl }, ...projectPages];
};

export default sitemap;
