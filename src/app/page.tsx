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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.shou-devlog.com/portfolio#person',
      name: 'SHOU',
      jobTitle: 'ITエンジニア / WEBコンテンツクリエイター / ファイナンシャルプランナー',
      url: 'https://www.shou-devlog.com/portfolio',
      worksFor: {
        '@id': 'https://www.shou-devlog.com/portfolio#organization',
      },
      sameAs: [
        'https://github.com/shou-dev19',
        'https://x.com/shou_dev',
        'https://www.youtube.com/@KakuyasuSimZukan',
        'https://note.com/shou_devlog',
        'https://qiita.com/shou-dev19',
        'https://setsuyaku-engineer.com/',
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.shou-devlog.com/portfolio#organization',
      name: 'UDKアセットデザイン',
      url: 'https://www.shou-devlog.com/portfolio',
      founder: {
        '@id': 'https://www.shou-devlog.com/portfolio#person',
      },
    },
  ],
};

const HomePage = async () => {
  const markdownPath = path.join(process.cwd(), '_contents', 'self-introduction.md');
  const [markdown, channelStats, blogMonthlyPv] = await Promise.all([
    fs.readFile(markdownPath, 'utf-8'),
    getChannelStats(),
    getBlogMonthlyPageViews(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
    </>
  );
};

export default HomePage;
