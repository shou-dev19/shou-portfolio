'use client';
import React from 'react';
import { Box } from '@mui/material';
import WelcomeSection from './WelcomeSection';
import ProfileSection from './ProfileSection';
import Section from './Section';

interface HomePageClientProps {
  markdown: string;
  skills: React.ReactNode;
  projects: React.ReactNode;
  career: React.ReactNode;
  outputs: React.ReactNode;
  contact: React.ReactNode;
}

const HomePageClient: React.FC<HomePageClientProps> = ({ markdown, skills, projects, career, outputs, contact }) => {
  return (
    <Box>
      <WelcomeSection />
      <ProfileSection markdown={markdown} />
      <Section id="skills">{skills}</Section>
      <Section id="projects">{projects}</Section>
      <Section id="career">{career}</Section>
      <Section id="outputs">{outputs}</Section>
      <Section id="contact">{contact}</Section>
    </Box>
  );
};

export default HomePageClient;
