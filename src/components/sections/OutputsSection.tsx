import { Box, Typography, Grid, Link } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { getLatestFeedItems } from '@/lib/feeds';
import AiWritingFeature from '../outputs/AiWritingFeature';
import FeedPanel from '../outputs/FeedPanel';
import YouTubePanel from '../outputs/YouTubePanel';

const publications = [
  { name: 'Qiita', url: 'https://qiita.com/shou-dev19', feed: 'https://qiita.com/shou-dev19/feed',
    description: 'AI駆動開発・エージェント活用の技術知見', accent: '#a8df72' },
  { name: 'Blog', url: 'https://setsuyaku-engineer.com/', feed: 'https://setsuyaku-engineer.com/feed/',
    description: 'AIを活用して運営する、節約・資産形成ブログ', accent: '#7dd3fc' },
  { name: 'note', url: 'https://note.com/shou_devlog', feed: 'https://note.com/shou_devlog/rss',
    description: 'エンジニアとしての学び・実践・考察', accent: '#8cdec9' },
];

const OutputsSection = async () => {
  const feeds = await Promise.all(publications.map(({ feed }) => getLatestFeedItems(feed, 3)));

  return (
    <Box sx={{ py: 4, px: { xs: 0, md: 2, lg: 4 }, maxWidth: 1360, mx: 'auto' }}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Outputs
      </Typography>
      <AiWritingFeature />
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 1.5, mb: 2.5 }}>
          <Typography component="h3" variant="h6" sx={{ color: 'white', fontWeight: 700 }}>最新の記事</Typography>
          <Typography variant="body2" sx={{ color: '#d1dce9' }}>それぞれの場所で、実践の続きを。</Typography>
        </Box>
        <Grid container spacing={2.5}>
          {publications.map((publication, index) => (
            <Grid item xs={12} md={4} key={publication.name}>
              <FeedPanel {...publication} items={feeds[index]} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <YouTubePanel />
      <Box sx={{ pt: 3, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="body2" sx={{ color: '#d1dce9' }}>コードや個人開発のアウトプットも公開しています。</Typography>
        <Link href="https://github.com/shou-dev19" target="_blank" rel="noopener noreferrer"
          sx={{ color: 'white', display: 'inline-flex', alignItems: 'center', gap: 1, py: 1 }}>
          <GitHub fontSize="small" /> GitHubを見る
        </Link>
      </Box>
    </Box>
  );
};

export default OutputsSection;
