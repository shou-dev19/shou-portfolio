import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Link, SvgIcon } from '@mui/material';
import { GitHub, RssFeed, Article, YouTube } from '@mui/icons-material';

const NoteIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24" fontSize="large">
    <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h8v2H3v-2z" />
  </SvgIcon>
);

const outputs = [
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/@KakuyasuSimZukan',
    description: 'AIを活用した格安SIM・節約術の動画を配信。メインの収益事業として運営中です。',
    icon: <YouTube fontSize="large" />,
    highlight: true,
  },
  {
    title: 'Blog',
    url: 'https://setsuyaku-engineer.com/',
    description: 'AIを活用して運営する節約・資産形成ブログ。YouTube連動でさらに情報を深掘りしています。',
    icon: <RssFeed fontSize="large" />,
    highlight: true,
  },
  {
    title: 'note',
    url: 'https://note.com/shou_devlog',
    description: 'ITエンジニアとしての知見や、個人事業主としてのリアルな経験を発信しています。',
    icon: <NoteIcon />,
    highlight: true,
  },
  {
    title: 'Qiita',
    url: 'https://qiita.com/shou-dev19',
    description: 'エンジニア向けに技術的な知見を共有しています。',
    icon: <Article fontSize="large" />,
    highlight: false,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/shou-dev19',
    description: '公開しているプロジェクトやコードを閲覧できます。',
    icon: <GitHub fontSize="large" />,
    highlight: false,
  },
];

const OutputsPage: React.FC = () => {
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Outputs
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {outputs.map((output) => (
          <Grid item xs={12} sm={6} md={4} key={output.title}>
            <Link href={output.url} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 3,
                  border: output.highlight ? '2px solid' : '1px solid',
                  borderColor: output.highlight ? 'primary.main' : 'divider',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 2, color: 'primary.main' }}>{output.icon}</Box>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: output.highlight ? 'bold' : 'normal' }}>
                  {output.title}
                </Typography>
                {output.highlight && (
                  <Typography variant="caption" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
                    メイン事業
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {output.description}
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OutputsPage;
