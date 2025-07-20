import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SkillsPage from './skills/page';
import ProjectsPage from './projects/page';
import OutputsPage from './outputs/page';
import ContactPage from './contact/page';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          I'm a software engineer.
        </Typography>
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
