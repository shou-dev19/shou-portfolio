import React from 'react';
import { Modal, Box, Typography, Button, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectModalProps {
  project: {
    title: string;
    content: string;
    github?: string;
    demo?: string;
    image?: string;
    architectureImage?: string;
    deployFlowImage?: string;
  };
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: '80%' },
          maxWidth: '900px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          outline: 'none',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
              {project.title}
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              {project.github && (
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: 1, mb: { xs: 1, md: 0 } }}
                >
                  GitHub
                </Button>
              )}
              {project.demo && (
                <Button
                  variant="contained"
                  startIcon={<LaunchIcon />}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </Button>
              )}
            </Box>
            <Box id="modal-modal-description" sx={{ mt: 2, '& a': { color: 'primary.main' } }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {project.image && (
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
              />
            )}
            {(project.architectureImage || project.deployFlowImage) && (
              <Box sx={{ mt: 3 }}>
                {project.architectureImage && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      システムアーキテクチャ
                    </Typography>
                    <Box
                      component="img"
                      src={project.architectureImage}
                      alt="システムアーキテクチャ図"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 2,
                        objectFit: 'cover',
                        mb: 3,
                      }}
                    />
                  </>
                )}
                {project.deployFlowImage && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      CI/CDワークフロー
                    </Typography>
                    <Box
                      component="img"
                      src={project.deployFlowImage}
                      alt="CI/CDワークフロー図"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 2,
                        objectFit: 'cover',
                      }}
                    />
                  </>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
