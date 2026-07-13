import React from 'react';
import { Box, Typography, IconButton, SvgIcon } from '@mui/material';
import { GitHub, X, YouTube, RssFeed } from '@mui/icons-material';

const NoteIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24">
    <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h8v2H3v-2z" />
  </SvgIcon>
);

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: 'center',
        mt: 'auto',
        background: 'linear-gradient(180deg, #0A1633 0%, #102A54 100%)',
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
        <IconButton
          aria-label="YouTube"
          component="a"
          href="https://www.youtube.com/@KakuyasuSimZukan"
          target="_blank"
          sx={{ color: 'white' }}
        >
          <YouTube />
        </IconButton>
        <IconButton
          aria-label="note"
          component="a"
          href="https://note.com/shou_devlog"
          target="_blank"
          sx={{ color: 'white' }}
        >
          <NoteIcon />
        </IconButton>
        <IconButton
          aria-label="Blog"
          component="a"
          href="https://setsuyaku-engineer.com/"
          target="_blank"
          sx={{ color: 'white' }}
        >
          <RssFeed />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        UDKアセットデザイン
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.75 }}>
        &copy; {new Date().getFullYear()} SHOU. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
