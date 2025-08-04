'use client';
import React from 'react';
import { Typography, Box, Avatar, Card } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ProfileSectionProps {
  markdown: string;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ markdown }) => {
  return (
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
  );
};

export default ProfileSection;
