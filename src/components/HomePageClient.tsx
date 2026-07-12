'use client';
import React from 'react';
import { Box } from '@mui/material';
import WelcomeSection from './WelcomeSection';
import ProfileSection from './ProfileSection';
import Section from './Section';
import StatsBadges from './StatsBadges';
import type { ChannelStats } from '@/lib/youtube';

interface HomePageClientProps {
  markdown: string;
  channelStats: ChannelStats | null;
  blogMonthlyPv: number | null;
  skills: React.ReactNode;
  projects: React.ReactNode;
  career: React.ReactNode;
  outputs: React.ReactNode;
  contact: React.ReactNode;
}

const HomePageClient: React.FC<HomePageClientProps> = ({
  markdown,
  channelStats,
  skills,
  projects,
  career,
  outputs,
  contact,
}) => {
  return (
    <Box>
      <WelcomeSection />
      <StatsBadges
        videoCount={channelStats?.videoCount}
        viewCount={channelStats?.viewCount}
      />
      <ProfileSection markdown={markdown} />
      <Section id="outputs">{outputs}</Section>
      <Section id="skills">{skills}</Section>
      <Section id="projects">{projects}</Section>
      <Section id="career">{career}</Section>
      <Section id="contact">{contact}</Section>
    </Box>
  );
};

export default HomePageClient;
