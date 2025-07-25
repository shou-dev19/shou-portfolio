import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface ProjectModalProps {
  project: {
    title: string;
    content: string;
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
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
