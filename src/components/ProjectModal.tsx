import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ReactMarkdown from 'react-markdown';

interface ProjectModalProps {
  project: {
    title: string;
    content: string;
    github?: string;
    demo?: string;
  };
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '90vh',
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          {project.title}
        </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>
          {project.github && (
            <Button variant="contained" startIcon={<GitHubIcon />} href={project.github} target="_blank" rel="noopener noreferrer" sx={{ mr: 1 }}>
              GitHub
            </Button>
          )}
          {project.demo && (
            <Button variant="contained" startIcon={<LaunchIcon />} href={project.demo} target="_blank" rel="noopener noreferrer">
              Demo
            </Button>
          )}
        </Box>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
