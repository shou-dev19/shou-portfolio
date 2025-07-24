import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), '_contents/projects');

function getSortedProjectsData() {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string; image: string }),
    };
  });

  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

const ProjectsPage: React.FC = () => {
  const allProjectsData = getSortedProjectsData();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Projects
      </Typography>
      <Grid container spacing={4}>
        {allProjectsData.map(({ id, title, image }) => (
          <Grid xs={12} sm={6} md={4} key={id}>
            <Card>
              {image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt={title}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectsPage;
