'use client';
import React, { useState } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import CareerModal from './CareerModal';

interface Career {
  id: string;
  title: string;
  period: string;
  position: string;
  content: string;
}

interface CareerClientProps {
  careerData: Career[];
}

const CareerClient: React.FC<CareerClientProps> = ({ careerData }) => {
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const handleOpenModal = (career: Career) => {
    setSelectedCareer(career);
  };

  const handleCloseModal = () => {
    setSelectedCareer(null);
  };

  return (
    <>
      <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
          Career
        </Typography>
        <Box sx={{
          position: 'relative',
          pl: '20px',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: '4px',
            bgcolor: 'grey.700',
          }
        }}>
          {careerData.map((career) => (
            <Box key={career.id} sx={{ position: 'relative', mb: 4, pl: '40px' }}>
              <Box sx={{
                position: 'absolute',
                left: '-8px',
                top: '24px',
                transform: 'translateY(-50%)',
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                border: '4px solid',
                borderColor: 'grey.700',
              }} />
              <motion.div whileHover={{ y: -5 }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleOpenModal(career)}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {career.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {career.period} - {career.position}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>
      {selectedCareer && (
        <CareerModal
          career={selectedCareer}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CareerClient;
