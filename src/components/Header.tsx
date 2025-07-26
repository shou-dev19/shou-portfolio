"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
    { text: 'Welcome', href: '/' },
    { text: 'Profile', href: '/#profile' },
    { text: 'Skills', href: '/#skills' },
    { text: 'Projects', href: '/#projects' },
    { text: 'Outputs', href: '/#outputs' },
    { text: 'Contact', href: '/#contact' },
  ];

  const drawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} href={item.href} scroll={false} onClick={() => {
              if (item.href === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (item.href.startsWith('/#')) {
                const id = item.href.substring(2);
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
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
                <Button key={item.text} component={Link} href={item.href} color="inherit" scroll={false} onClick={() => {
                  if (item.href === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (item.href.startsWith('/#')) {
                    const id = item.href.substring(2);
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}>
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