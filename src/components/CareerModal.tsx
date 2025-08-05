import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CareerModalProps {
  career: {
    title: string;
    period: string;
    position: string;
    content: string;
  };
  onClose: () => void;
}

const CareerModal: React.FC<CareerModalProps> = ({ career, onClose }) => {
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
        <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
          {career.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {career.period} - {career.position}
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2, '& a': { color: 'primary.main' } }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{career.content}</ReactMarkdown>
        </Box>
      </Box>
    </Modal>
  );
};

export default CareerModal;