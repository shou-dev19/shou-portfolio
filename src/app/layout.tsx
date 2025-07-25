import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Layout from '../components/Layout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHOU's Portfolio",
  description: "This is a portfolio website by SHOU.",
  openGraph: {
    title: "SHOU's Portfolio",
    description: "This is a portfolio website by SHOU.",
    type: "website",
    url: "https://shou-portfolio.vercel.app/",
    images: [
      {
        url: "https://shou-portfolio.vercel.app/myicon.png",
        width: 1200,
        height: 630,
        alt: "My Portfolio OGP Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
