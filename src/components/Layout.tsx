import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      className="background-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // 半透明の白色
          zIndex: 0,
        }}
      />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
