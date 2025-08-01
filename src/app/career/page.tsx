import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
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

  return allCareerData.sort((a, b) => (a.id < b.id ? 1 : -1));
}

const CareerPage = async () => {
  const careerData = await getCareerData();

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Career
      </Typography>
      <Box sx={{ position: 'relative', '&::before': { content: '""', position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', backgroundColor: 'grey.700', transform: 'translateX(-50%)' } }}>
        {careerData.map((career, index) => (
          <Box key={career.id} sx={{ display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end', mb: 4, position: 'relative' }}>
            <Box sx={{ width: 'calc(50% - 40px)' }}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {career.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {career.period} - {career.position}
                  </Typography>
                  <ReactMarkdown>{career.content}</ReactMarkdown>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: '50%', backgroundColor: 'primary.main', border: '4px solid', borderColor: 'grey.700' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CareerPage;
