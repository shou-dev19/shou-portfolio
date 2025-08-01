import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const careerDirectory = path.join(process.cwd(), '_contents/career');

async function getCareerData() {
  const fileNames = fs.readdirSync(careerDirectory);
  const allCareerData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(careerDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; period: string; position: string }),
      content: matterResult.content,
    };
  });

  return allCareerData.sort((a, b) => (a.id > b.id ? 1 : -1));
}

const CareerPage = async () => {
  const careerData = await getCareerData();

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Career
      </Typography>
      <Box>
        {careerData.map((career) => (
          <Card key={career.id} sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {career.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {career.period} - {career.position}
              </Typography>
              <hr />
              <ReactMarkdown>{career.content}</ReactMarkdown>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CareerPage;