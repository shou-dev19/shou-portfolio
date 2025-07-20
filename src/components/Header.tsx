import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button component={Link} href="/" sx={{ color: 'white' }}>
            My Portfolio
          </Button>
        </Typography>
        <Button component={Link} href="/#skills" color="inherit">Skills</Button>
        <Button component={Link} href="/#projects" color="inherit">Projects</Button>
        <Button component={Link} href="/#outputs" color="inherit">Outputs</Button>
        <Button component={Link} href="/#contact" color="inherit">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;