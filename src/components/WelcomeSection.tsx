'use client';
import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const WelcomeSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        UDKアセットデザイン
      </Typography>
      <Typography variant="h5" component="p" sx={{ mb: 2, fontWeight: 500 }}>
        SHOU — ITエンジニア × 資産形成
      </Typography>
      <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
        AIを活用した YouTube・ブログ・note の運営で、資産形成を加速させます。
      </Typography>
      <Box>
        <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('profile')} sx={{ m: 1 }}>
          Profile
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('outputs')} sx={{ m: 1 }}>
          Outputs
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('skills')} sx={{ m: 1 }}>
          Skills
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('projects')} sx={{ m: 1 }}>
          Projects
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('career')} sx={{ m: 1 }}>
          Career
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('contact')} sx={{ m: 1 }}>
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomeSection;
