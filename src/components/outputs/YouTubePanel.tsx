import Image from 'next/image';
import { Box, Typography, Grid, Card, Link } from '@mui/material';
import { YouTube, PlayArrow } from '@mui/icons-material';
import { getChannelStats, getLatestVideos } from '@/lib/youtube';
import { formatStatValue } from '@/lib/stats';

const YouTubePanel = async () => {
  const [videos, channelStats] = await Promise.all([getLatestVideos(4), getChannelStats()]);
  return (
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

  );
};

export default YouTubePanel;
