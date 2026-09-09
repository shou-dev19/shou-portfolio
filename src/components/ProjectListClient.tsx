'use client';

import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ProjectModal from './ProjectModal';

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
  architectureImage?: string;
  deployFlowImage?: string;
}

interface ProjectListClientProps {
  projects: ProjectData[];
}

const ProjectListClient: React.FC<ProjectListClientProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenModal = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                  cursor: 'pointer',
                },
              }}
            >
              <CardActionArea
                id={`project-${project.id}`}
                aria-label={`${project.title}の詳細を見る`}
                aria-haspopup="dialog"
                onClick={() => handleOpenModal(project)}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch',
                  justifyContent: 'flex-start', scrollMarginTop: '100px',
                  '&.Mui-focusVisible': { outline: '3px solid #0284c7', outlineOffset: -3 } }}
              >
                {project.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.image}
                    alt={project.title}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Typography sx={{ mt: 2, color: '#0369a1', fontSize: '0.85rem', fontWeight: 600 }}>詳しく見る →</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProjectListClient;
