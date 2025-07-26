import React from 'react';
import { Box, Typography } from '@mui/material';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ProjectListClient from '../../components/ProjectListClient'; // 新しいクライアントコンポーネント

// データ型を定義
interface ProjectData {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  content: string;
  github?: string;
  demo?: string;
}

const projectsDirectory = path.join(process.cwd(), '_contents/projects');

// プロジェクトデータを取得する関数
function getSortedProjectsData(): ProjectData[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      content: matterResult.content,
      ...(matterResult.data as { title: string; date: string; image: string; description: string; github?: string; demo?: string; }),
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

const ProjectsPage = () => {
  const allProjectsData = getSortedProjectsData();

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Projects
      </Typography>
      <ProjectListClient projects={allProjectsData} />
    </Box>
  );
};

export default ProjectsPage;