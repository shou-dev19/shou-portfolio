'use client';
import React from 'react';
import { Container, Typography, Box, Avatar, Button, Card } from '@mui/material';
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundImage: 'url(/portfolio/haikei.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          p: 4,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          SHOUのポートフォリオへようこそ
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 4 }}>
          これまでの経験とスキル、そして情熱をご覧ください。
        </Typography>
        <Box>
          <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('profile')} sx={{ m: 1 }}>
            Profile
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('skills')} sx={{ m: 1 }}>
            Skills
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('projects')} sx={{ m: 1 }}>
            Projects
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('outputs')} sx={{ m: 1 }}>
            Outputs
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('contact')} sx={{ m: 1 }}>
            Contact
          </Button>
        </Box>
      </Box>

      {/* Profile Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <Box id="profile" sx={{
          my: 4,
          textAlign: 'center',
          backgroundImage: 'url(/portfolio/haikei.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          zIndex: 0,
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // 半透明の黒色オーバーレイ
            zIndex: 1,
            borderRadius: 2,
          }} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
              Profile
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Avatar
                alt="My Icon"
                src="/portfolio/myicon.png"
                sx={{ width: 120, height: 120 }}
              />
            </Box>
            <Card sx={{ my: 4, textAlign: 'left', p: 4, borderRadius: 2, boxShadow: 3 }}>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </Card>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="skills" sx={{
          my: 8,
          backgroundImage: 'url(/portfolio/haikei.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          zIndex: 0,
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // 半透明の黒色オーバーレイ
            zIndex: 1,
            borderRadius: 2,
          }} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>{skills}</Box>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="projects" sx={{
          my: 8,
          backgroundImage: 'url(/portfolio/haikei.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          zIndex: 0,
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // 半透明の黒色オーバーレイ
            zIndex: 1,
            borderRadius: 2,
          }} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>{projects}</Box>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="outputs" sx={{
          my: 8,
          backgroundImage: 'url(/portfolio/haikei.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          zIndex: 0,
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // 半透明の黒色オーバーレイ
            zIndex: 1,
            borderRadius: 2,
          }} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>{outputs}</Box>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Box id="contact" sx={{
          my: 8,
          backgroundImage: 'url(/portfolio/haikei.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          zIndex: 0,
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // 半透明の黒色オーバーレイ
            zIndex: 1,
            borderRadius: 2,
          }} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>{contact}</Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomePageClient;