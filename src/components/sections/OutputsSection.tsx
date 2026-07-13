import React from 'react';
import Image from 'next/image';
import { Box, Typography, Grid, Card, Link, SvgIcon, Divider } from '@mui/material';
import { GitHub, Language, Article, YouTube, PlayArrow } from '@mui/icons-material';
import { FeedItem, getLatestFeedItems } from '@/lib/feeds';
import { getChannelStats, getLatestVideos } from '@/lib/youtube';
import { formatStatValue } from '@/lib/stats';

const NoteIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24" fontSize="large">
    <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h8v2H3v-2z" />
  </SvgIcon>
);

const otherPlatforms = [
  {
    title: 'Blog',
    url: 'https://setsuyaku-engineer.com/',
    description: 'YouTube連動の節約・資産形成ブログ。AIを活用して運営中。',
    icon: <Language fontSize="large" />,
  },
  {
    title: 'note',
    url: 'https://note.com/shou_devlog',
    description: 'ITエンジニア・個人事業主としての知見を発信。',
    icon: <NoteIcon />,
  },
  {
    title: 'Qiita',
    url: 'https://qiita.com/shou-dev19',
    description: 'エンジニア向けの技術記事を共有しています。',
    icon: <Article fontSize="large" />,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/shou-dev19',
    description: 'OSSプロジェクトやコードを公開しています。',
    icon: <GitHub fontSize="large" />,
  },
];

interface FeedPanelProps {
  items: FeedItem[];
  siteName: string;
  siteUrl: string;
  icon: React.ReactNode;
}

const FeedPanel: React.FC<FeedPanelProps> = ({ items, siteName, siteUrl, icon }) => (
  <Box
    sx={{
      height: '100%',
      p: { xs: 2, md: 3 },
      backgroundColor: 'rgba(0,0,0,0.55)',
      borderRadius: 2,
      border: '1px solid rgba(255,255,255,0.15)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
      <Box sx={{ display: 'flex', color: 'white' }}>{icon}</Box>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
        {siteName}
      </Typography>
      <Link
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          ml: 'auto',
          color: 'rgba(255,255,255,0.65)',
          fontSize: '0.75rem',
          textDecorationColor: 'rgba(255,255,255,0.3)',
          '&:hover': { color: 'white' },
        }}
      >
        サイトを見る
      </Link>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {items.map((item) => (
        <Link
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1,
            mx: -1,
            borderRadius: 1,
            textDecoration: 'none',
            transition: 'background-color 0.2s',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
          }}
        >
          {item.thumbnailUrl ? (
            <Box
              component="img"
              src={item.thumbnailUrl}
              alt=""
              sx={{
                width: 96,
                aspectRatio: '16 / 9',
                flexShrink: 0,
                objectFit: 'cover',
                borderRadius: 1,
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
            />
          ) : (
            <Box
              sx={{
                width: 96,
                aspectRatio: '16 / 9',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                color: 'rgba(255,255,255,0.35)',
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <Article />
            </Box>
          )}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 600,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.45,
              }}
            >
              {item.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.68rem' }}>
              {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  </Box>
);

const OutputsSection: React.FC = async () => {
  const [videos, channelStats, blogItems, noteItems] = await Promise.all([
    getLatestVideos(4),
    getChannelStats(),
    getLatestFeedItems('https://setsuyaku-engineer.com/feed/', 3),
    getLatestFeedItems('https://note.com/shou_devlog/rss', 3),
  ]);
  const hasFeedItems = blogItems.length > 0 || noteItems.length > 0;

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Outputs
      </Typography>

      {/* YouTube Hero */}
      <Box
        sx={{
          mb: 6,
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          backgroundColor: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,0,0,0.4)',
        }}
      >
        {/* Channel header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <YouTube sx={{ fontSize: { xs: 40, md: 52 }, color: '#FF0000' }} />
            <Box>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', lineHeight: 1.2 }}>
                格安SIM図鑑【スマホ攻略チャンネル】
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mt: 0.5 }}>
                格安SIM・節約術・スマホ攻略を毎週配信中
              </Typography>
              {channelStats && (
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.58)', mt: 0.75, display: 'block' }}>
                  動画{formatStatValue(channelStats.videoCount)}本 ・ 総再生{formatStatValue(channelStats.viewCount)}回
                </Typography>
              )}
            </Box>
          </Box>
          <Link
            href="https://www.youtube.com/@KakuyasuSimZukan"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.2,
              backgroundColor: '#FF0000',
              color: 'white',
              borderRadius: 1,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: '#cc0000' },
            }}
          >
            <YouTube fontSize="small" />
            チャンネルを見る
          </Link>
        </Box>

        {/* Latest videos */}
        {videos.length > 0 && (
          <>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>
              最新動画
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              {videos.map((video) => (
                <Grid item xs={12} sm={6} md={3} key={video.videoId}>
                  <Link
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none' }}
                  >
                    <Card
                      sx={{
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        color: 'white',
                        height: '100%',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                      }}
                    >
                      {/* Thumbnail 16:9 */}
                      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 25vw"
                          style={{ objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 6,
                            right: 6,
                            bgcolor: 'rgba(0,0,0,0.75)',
                            borderRadius: '50%',
                            width: 28,
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <PlayArrow sx={{ fontSize: 16, color: 'white' }} />
                        </Box>
                      </Box>
                      {/* Info */}
                      <Box sx={{ p: 1.5 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.45,
                            mb: 0.5,
                          }}
                        >
                          {video.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem' }}>
                          {new Date(video.publishedAt).toLocaleDateString('ja-JP')}
                        </Typography>
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>

      {hasFeedItems && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.75)', mb: 3, textAlign: 'center' }}>
            最新の記事
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {blogItems.length > 0 && (
              <Grid item xs={12} md={6}>
                <FeedPanel
                  items={blogItems}
                  siteName="Blog"
                  siteUrl="https://setsuyaku-engineer.com/"
                  icon={<Language />}
                />
              </Grid>
            )}
            {noteItems.length > 0 && (
              <Grid item xs={12} md={6}>
                <FeedPanel
                  items={noteItems}
                  siteName="note"
                  siteUrl="https://note.com/shou_devlog"
                  icon={<NoteIcon />}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      <Divider sx={{ mb: 4, borderColor: 'rgba(255,255,255,0.15)' }} />

      {/* Other platforms */}
      <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.75)', mb: 3, textAlign: 'center' }}>
        その他のアウトプット
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {otherPlatforms.map((platform) => (
          <Grid item xs={12} sm={6} md={3} key={platform.title}>
            <Link href={platform.url} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
                }}
              >
                <Box sx={{ mb: 2, color: 'primary.main' }}>{platform.icon}</Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {platform.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
                  {platform.description}
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OutputsSection;
