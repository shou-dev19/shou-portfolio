'use client';
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';

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
        backgroundImage: 'url(/portfolio/haikei.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
        color: 'white',
        p: 4,
        position: 'relative',
        zIndex: 0,
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.35)', zIndex: 1 }} />
      <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          UDKアセットデザイン
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 2, fontWeight: 500 }}>
          SHOU — AI × エンジニアリング × FP
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 3, opacity: 0.9, maxWidth: 800 }}>
          AIによる業務効率化、Remotionを使った動画制作、資産形成コンテンツの企画・制作まで。
          &quot;仕組みづくり&quot;でビジネスをお手伝いします。
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
          {['AI業務効率化', 'YouTube動画制作', '資産形成コンテンツ'].map((label) => (
            <Box
              key={label}
              component="span"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => scrollToSection('contact')}
            sx={{ textTransform: 'none' }}
          >
            お仕事のご相談
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="https://www.youtube.com/@KakuyasuSimZukan"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<YouTubeIcon />}
            sx={{
              textTransform: 'none',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
              },
            }}
          >
            YouTubeチャンネルを見る
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeSection;
