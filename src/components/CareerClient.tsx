'use client';
import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

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
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Career
      </Typography>
      <Box sx={{ position: 'relative', '&::before': { content: '""', position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', backgroundColor: 'grey.700', transform: 'translateX(-50%)' } }}>
        {careerData.map((career, index) => (
          <Box key={career.id} sx={{ display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end', mb: 4, position: 'relative' }}>
            <Box sx={{ width: 'calc(50% - 40px)' }}>
              <motion.div whileHover={{ y: -10 }}>
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
              </motion.div>
            </Box>
            <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: '50%', backgroundColor: 'primary.main', border: '4px solid', borderColor: 'grey.700' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CareerClient;
