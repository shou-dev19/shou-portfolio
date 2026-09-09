'use client';

import { useState } from 'react';
import { Dialog, Box, Typography, Button, IconButton, DialogContent, useMediaQuery, useTheme } from '@mui/material';
import { GitHub, Launch, Close } from '@mui/icons-material';
import ProjectMarkdown from './projects/ProjectMarkdown';
import ProjectImage from './projects/ProjectImage';
import ProjectImageViewer, { ProjectFigure } from './projects/ProjectImageViewer';

interface ProjectModalProps {
  project: {
    title: string;
    description?: string;
    content: string;
    github?: string;
    demo?: string;
    image?: string;
    architectureImage?: string;
    deployFlowImage?: string;
  };
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedFigure, setSelectedFigure] = useState<ProjectFigure | null>(null);
  const diagrams = [
    { src: project.architectureImage, title: 'システムアーキテクチャ' },
    { src: project.deployFlowImage, title: 'CI/CDワークフロー' },
  ];

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="lg" fullScreen={fullScreen}
      aria-labelledby="project-dialog-title" aria-describedby={project.description ? 'project-dialog-summary' : undefined}
      PaperProps={{ sx: { borderRadius: { xs: 0, sm: 3 }, maxHeight: { sm: '92dvh' }, bgcolor: '#f8fafc' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2,
        px: { xs: 2, sm: 4 }, py: 1.25, borderBottom: '1px solid #dce4ed', bgcolor: 'white', flexShrink: 0 }}>
        <Typography variant="overline" sx={{ color: '#52657b', letterSpacing: '0.14em', fontWeight: 700 }}>
          PROJECT / プロジェクト詳細
        </Typography>
        <IconButton autoFocus aria-label="プロジェクト詳細を閉じる" onClick={onClose} sx={{ color: '#233c57', width: 44, height: 44 }}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent sx={{ p: 0, scrollBehavior: 'auto' }}>
        <Box sx={{ px: { xs: 2.5, sm: 5, md: 7 }, pt: { xs: 3, sm: 5 }, pb: 4, bgcolor: 'white' }}>
          <Typography id="project-dialog-title" component="h2" sx={{ color: '#102a46', fontSize: { xs: '1.55rem', sm: '2.1rem' },
            lineHeight: 1.5, fontWeight: 700, letterSpacing: '-0.025em', overflowWrap: 'anywhere', mb: 2 }}>
            {project.title}
          </Typography>
          {project.description && <Typography id="project-dialog-summary" sx={{ color: '#4b6076', lineHeight: 1.95, maxWidth: '52em' }}>
            {project.description}
          </Typography>}
          {(project.github || project.demo) && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
              {project.github && <Button variant="outlined" startIcon={<GitHub />} href={project.github} target="_blank" rel="noopener noreferrer">GitHub</Button>}
              {project.demo && <Button variant="contained" startIcon={<Launch />} href={project.demo} target="_blank" rel="noopener noreferrer">デモを見る</Button>}
            </Box>
          )}
        </Box>
        <Box sx={{ px: { xs: 2.5, sm: 5, md: 7 }, py: { xs: 3, sm: 4 } }}>
          {diagrams.map(({ src, title }) => src && (
            <ProjectImage key={src} figure={{ src, title }} onOpen={setSelectedFigure} />
          ))}
          <Box sx={{ maxWidth: '48rem', mx: 'auto', my: { xs: 3, sm: 5 } }}>
            <ProjectMarkdown content={project.content} />
          </Box>
          {project.image && <ProjectImage figure={{ src: project.image, title: 'プロジェクトイメージ' }} onOpen={setSelectedFigure} />}
        </Box>
      </DialogContent>
      {selectedFigure && <ProjectImageViewer figure={selectedFigure} onClose={() => setSelectedFigure(null)} />}
    </Dialog>
  );
};

export default ProjectModal;
