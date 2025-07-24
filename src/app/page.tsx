import React from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import SkillsPage from './skills/page';
import ProjectsPage from './projects/page';
import OutputsPage from './outputs/page';
import ContactPage from './contact/page';
import fs from 'fs/promises';
import path from 'path';

const HomePage = async () => {
  const markdownPath = path.join(process.cwd(), '_contents', 'self-introduction.md');
  const markdown = await fs.readFile(markdownPath, 'utf-8');

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom textAlign="center">
          Profile
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Avatar
            alt="My Icon"
            src="/myicon.png"
            sx={{ width: 120, height: 120 }}
          />
        </Box>
        <Box sx={{ my: 4 }}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Box>
      </Box>

      <Box id="skills" sx={{ my: 8 }}>
        <SkillsPage />
      </Box>

      <Box id="projects" sx={{ my: 8 }}>
        <ProjectsPage />
      </Box>

      <Box id="outputs" sx={{ my: 8 }}>
        <OutputsPage />
      </Box>

      <Box id="contact" sx={{ my: 8 }}>
        <ContactPage />
      </Box>
    </Container>
  );
};

export default HomePage;