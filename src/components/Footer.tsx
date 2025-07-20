import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', mt: 'auto', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} My Portfolio. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
