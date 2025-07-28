import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Link, SvgIcon } from '@mui/material';
import { GitHub, RssFeed, Article } from '@mui/icons-material';

const outputs = [
  {
    title: 'Qiita',
    url: 'https://qiita.com/shou-dev19',
    description: '技術的な知見を共有しています。',
    icon: <Article fontSize="large" />,
  },
  {
    title: 'Blog',
    url: 'https://setsuyaku-engineer.com/',
    description: '資産形成を進めるにあたっての節約系ブログを運営しています。',
    icon: <RssFeed fontSize="large" />,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/shou-dev19',
    description: '公開しているプロジェクトやコードを閲覧できます。',
    icon: <GitHub fontSize="large" />,
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
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 2, color: 'primary.main' }}>{output.icon}</Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {output.title}
                </Typography>
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
