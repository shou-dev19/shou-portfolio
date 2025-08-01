"use client";

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Link from 'next/link';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Welcome', href: '/', icon: <HomeIcon /> },
    { text: 'Profile', href: '/#profile', icon: <PersonIcon /> },
    { text: 'Skills', href: '/#skills', icon: <BuildIcon /> },
    { text: 'Projects', href: '/#projects', icon: <WorkIcon /> },
    { text: 'Career', href: '/#career', icon: <BusinessCenterIcon /> },
    { text: 'Outputs', href: '/#outputs', icon: <ArticleIcon /> },
    { text: 'Contact', href: '/#contact', icon: <MailIcon /> },
  ];

  const drawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
          color: 'white',
          width: '60%',
          maxWidth: '300px',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              href={item.href}
              scroll={false}
              onClick={() => {
                if (item.href === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (item.href.startsWith('/#')) {
                  const id = item.href.substring(2);
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              sx={{
                paddingY: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button component={Link} href="/" sx={{ color: 'white', fontSize: '1.25rem' }}>
              SHOU&apos;s Portfolio
            </Button>
          </Typography>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  scroll={false}
                  onClick={() => {
                    if (item.href === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item.href.startsWith('/#')) {
                      const id = item.href.substring(2);
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      {drawer}
    </>
  );
};

export default Header;