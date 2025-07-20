import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const outputs = [
  {
    title: 'Qiita',
    url: 'https://qiita.com/your-account',
    description: '技術的な知見を共有しています。'
  },
  {
    title: 'Blog',
    url: 'https://your.blog.com',
    description: '日々の学習や考えをまとめています。'
  }
];

const OutputsPage: React.FC = () => {
  return (
    <Container sx={{ py: 4 }}>
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
    </Container>
  );
};

export default OutputsPage;
