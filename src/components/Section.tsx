'use client';
import React from 'react';
import { Box } from '@mui/material';
import { motion, Variants } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Section: React.FC<SectionProps> = ({ id, children }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Box id={id} sx={{
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
        <Box sx={{ position: 'relative', zIndex: 2 }}>{children}</Box>
      </Box>
    </motion.div>
  );
};

export default Section;
