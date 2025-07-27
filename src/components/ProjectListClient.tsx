'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ProjectModal from './ProjectModal';

// データ型を定義
interface ProjectData {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  content: string;
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
              onClick={() => handleOpenModal(project)}
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
                <Typography gutterBottom variant="h5" component="div">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
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
