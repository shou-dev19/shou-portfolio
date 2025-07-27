import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const projectsDirectory = path.join(process.cwd(), '_contents/projects');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
}

async function getProjectData(id: string) {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; image: string }),
  };
}

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const projectData = await getProjectData(params.id);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {projectData.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {projectData.date}
        </Typography>
        <hr />
        <ReactMarkdown>{projectData.content}</ReactMarkdown>
      </Box>
    </Container>
  );
};

export default ProjectPage;
