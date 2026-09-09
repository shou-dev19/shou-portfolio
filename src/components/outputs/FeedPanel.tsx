import { Box, Typography, Link } from '@mui/material';
import { NorthEast } from '@mui/icons-material';
import type { FeedItem } from '@/lib/feeds';

interface FeedPanelProps {
  items: FeedItem[];
  name: string;
  url: string;
  description: string;
  accent: string;
}

const FeedPanel = ({ items, name, url, description, accent }: FeedPanelProps) => (
  <Box sx={{ height: '100%', p: { xs: 2.5, lg: 3 }, bgcolor: '#0e1d30', borderRadius: 2,
    border: '1px solid #34465d', borderTop: `3px solid ${accent}`, display: 'flex', flexDirection: 'column' }}>
    <Typography component="h4" sx={{ color: accent, fontWeight: 700, fontSize: '1.35rem' }}>{name}</Typography>
    <Typography variant="body2" sx={{ color: '#b8c9d9', mt: 1, mb: 2, lineHeight: 1.7 }}>{description}</Typography>
    {items.length > 0 ? (
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, flexGrow: 1 }}>
        {items.map((item) => (
          <Box component="li" key={item.url} sx={{ borderTop: '1px solid #304157' }}>
            <Link href={item.url} target="_blank" rel="noopener noreferrer"
              sx={{ display: 'block', py: 2, color: 'white', textDecoration: 'none',
                '&:hover': { color: accent }, '&:focus-visible': { outline: `2px solid ${accent}`, outlineOffset: 3 } }}>
              <Typography component="time" dateTime={item.publishedAt} variant="caption"
                sx={{ display: 'block', color: '#a8bbcf', mb: 0.75, fontVariantNumeric: 'tabular-nums' }}>
                {new Date(item.publishedAt).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })}
              </Typography>
              <Typography component="span" variant="body2" sx={{ fontWeight: 600, lineHeight: 1.85, overflowWrap: 'anywhere' }}>
                {item.title}
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    ) : (
      <Typography variant="body2" sx={{ color: '#c3d1df', py: 2, flexGrow: 1, lineHeight: 1.8 }}>
        現在、記事一覧を表示できません。最新の記事は{name}でご覧いただけます。
      </Typography>
    )}
    <Link href={url} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: 1, color: accent, pt: 2, mt: 1, borderTop: '1px solid #304157', fontSize: '0.85rem' }}>
      {name}の記事をすべて見る <NorthEast fontSize="small" />
    </Link>
  </Box>
);

export default FeedPanel;
