import React from 'react';
import fs from 'fs/promises';

export const revalidate = 86400;
import path from 'path';
import HomePageClient from '../components/HomePageClient';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import OutputsSection from '../components/sections/OutputsSection';
import ContactSection from '../components/sections/ContactSection';
import CareerSection from '../components/sections/CareerSection';
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
      skills={<SkillsSection />}
      projects={<ProjectsSection />}
      career={<CareerSection />}
      outputs={<OutputsSection />}
      contact={<ContactSection />}
    />
  );
};

export default HomePage;
