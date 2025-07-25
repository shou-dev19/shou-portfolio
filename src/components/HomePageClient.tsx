"use client";
import React from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface HomePageClientProps {
  markdown: string;
  skills: React.ReactNode;
  projects: React.ReactNode;
  outputs: React.ReactNode;
  contact: React.ReactNode;
}

const HomePageClient: React.FC<HomePageClientProps> = ({ markdown, skills, projects, outputs, contact }) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Profile
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Avatar
              alt="My Icon"
              src="/myicon.png"
              sx={{ width: 120, height: 120 }}
            />
          </Box>
          <Box sx={{ my: 4, textAlign: 'left' }}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="skills" sx={{ my: 8 }}>{skills}</Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="projects" sx={{ my: 8 }}>{projects}</Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="outputs" sx={{ my: 8 }}>{outputs}</Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="contact" sx={{ my: 8 }}>{contact}</Box>
      </motion.div>
    </Container>
  );
};

export default HomePageClient;
