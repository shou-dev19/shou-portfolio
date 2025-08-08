import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, X } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: 'center',
        mt: 'auto',
        background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 100%)',
        color: 'white',
      }}
    >
      <Box sx={{ mb: 1 }}>
        <IconButton
          aria-label="GitHub"
          component="a"
          href="https://github.com/shou-dev19"
          target="_blank"
          sx={{ color: 'white' }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          aria-label="X"
          component="a"
          href="https://x.com/shou_dev"
          target="_blank"
          sx={{ color: 'white' }}
        >
          <X />
        </IconButton>
        {/* 他に追加したいソーシャルリンクがあればここに追加 */}
      </Box>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} SHOU&apos;s Portfolio. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
