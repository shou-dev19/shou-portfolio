import React from 'react';
import fs from 'fs/promises';

export const revalidate = 86400;
import path from 'path';
import HomePageClient from '../components/HomePageClient';
import SkillsPage from './skills/page';
import ProjectsPage from './projects/page';
import OutputsPage from './outputs/page';
import ContactPage from './contact/page';
import CareerPage from './career/page';
import { getChannelStats } from '@/lib/youtube';
import { getBlogMonthlyPageViews } from '@/lib/analytics';

const HomePage = async () => {
  const markdownPath = path.join(process.cwd(), '_contents', 'self-introduction.md');
  const [markdown, channelStats, blogMonthlyPv] = await Promise.all([
    fs.readFile(markdownPath, 'utf-8'),
    getChannelStats(),
    getBlogMonthlyPageViews(),
  ]);

  return (
    <HomePageClient
      markdown={markdown}
      channelStats={channelStats}
      blogMonthlyPv={blogMonthlyPv}
      skills={<SkillsPage />}
      projects={<ProjectsPage />}
      career={<CareerPage />}
      outputs={<OutputsPage />}
      contact={<ContactPage />}
    />
  );
};

export default HomePage;
