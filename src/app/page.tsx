import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import HomePageClient from '../components/HomePageClient';
import SkillsPage from './skills/page';
import ProjectsPage from './projects/page';
import OutputsPage from './outputs/page';
import ContactPage from './contact/page';

const HomePage = async () => {
  const markdownPath = path.join(process.cwd(), '_contents', 'self-introduction.md');
  const markdown = await fs.readFile(markdownPath, 'utf-8');

  return (
    <HomePageClient
      markdown={markdown}
      skills={<SkillsPage />}
      projects={<ProjectsPage />}
      outputs={<OutputsPage />}
      contact={<ContactPage />}
    />
  );
};

export default HomePage;