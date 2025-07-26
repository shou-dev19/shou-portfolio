import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const outputs = [
  {
    title: 'Qiita',
    url: 'https://qiita.com/shou-dev19',
    description: '技術的な知見を共有しています。'
  },
  {
    title: 'Blog',
    url: 'https://setsuyaku-engineer.com/',
    description: '資産形成を進めるにあたっての節約系ブログを運営しています。'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/shou-dev19',
    description: '公開しているプロジェクトやコードを閲覧できます。'
  }
];

const OutputsPage: React.FC = () => {
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Outputs
      </Typography>
      <List>
        {outputs.map((output) => (
          <ListItem key={output.title} component={Link} href={output.url} target="_blank" rel="noopener noreferrer">
            <ListItemText primary={output.title} secondary={output.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OutputsPage;
