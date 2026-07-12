import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Layout from '../components/Layout';

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shou-devlog.com"),
  title: "UDKアセットデザイン | SHOUのポートフォリオ",
  description:
    "AI×エンジニアリング×FPの知見を活かし、AI業務効率化・YouTube動画制作(Remotion)・資産形成コンテンツ制作を手がけるUDKアセットデザイン(SHOU)のポートフォリオサイトです。",
  openGraph: {
    title: "UDKアセットデザイン | SHOUのポートフォリオ",
    description:
      "AI×エンジニアリング×FPの知見を活かし、AI業務効率化・YouTube動画制作(Remotion)・資産形成コンテンツ制作を手がけるUDKアセットデザイン(SHOU)のポートフォリオサイトです。",
    type: "website",
    url: "https://www.shou-devlog.com/portfolio",
    siteName: "UDKアセットデザイン",
    locale: "ja_JP",
    images: [
      {
        url: "/portfolio/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "UDKアセットデザイン — AI × エンジニアリング × FP",
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
      <body className={notoSansJP.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
