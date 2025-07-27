'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto, Playfair_Display } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: {
      fontFamily: playfairDisplay.style.fontFamily,
    },
  },
});

export default theme;
