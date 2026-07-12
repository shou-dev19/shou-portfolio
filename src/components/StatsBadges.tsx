'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { formatStatValue } from '@/lib/stats';

interface StatsBadgesProps {
  subscriberCount?: number | null;
  videoCount?: number | null;
  viewCount?: number | null;
  blogMonthlyPv?: number | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const StatsBadges: React.FC<StatsBadgesProps> = ({
  subscriberCount,
  videoCount,
  viewCount,
  blogMonthlyPv,
}) => {
  const badges = [
    subscriberCount == null ? null : `チャンネル登録者 ${formatStatValue(subscriberCount)}人`,
    videoCount == null ? null : `動画本数 ${formatStatValue(videoCount)}本`,
    viewCount == null ? null : `総再生回数 ${formatStatValue(viewCount)}回`,
    blogMonthlyPv == null ? null : `ブログ月間PV ${formatStatValue(blogMonthlyPv)}PV`,
    '副業による収益化 達成',
  ].filter((badge): badge is string => badge !== null);

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: 1.25, sm: 2 },
        px: 2,
        py: { xs: 3, md: 4 },
      }}
    >
      {badges.map((badge) => (
        <Box
          component={motion.div}
          variants={badgeVariants}
          whileHover={{ y: -4 }}
          key={badge}
          sx={{
            px: { xs: 2, sm: 2.5 },
            py: 1.25,
            borderRadius: 2,
            backgroundColor: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.16)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            transition: 'box-shadow 0.2s ease',
            '&:hover': { boxShadow: '0 12px 28px rgba(0,0,0,0.28)' },
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'white', fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            {badge}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StatsBadges;
