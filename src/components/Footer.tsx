import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, Twitter } from '@mui/icons-material'; // 例としてGitHubとTwitterアイコンをインポート

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', mt: 'auto', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ mb: 1 }}>
        <IconButton aria-label="GitHub" component="a" href="https://github.com/shou-dev19" target="_blank">
          <GitHub />
        </IconButton>
        <IconButton aria-label="Twitter" component="a" href="https://twitter.com/your-account" target="_blank">
          <Twitter />
        </IconButton>
        {/* 他に追加したいソーシャルリンクがあればここに追加 */}
      </Box>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} SHOU&apos;s Portfolio. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
