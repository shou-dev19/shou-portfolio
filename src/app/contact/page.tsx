import React from 'react';
import { Box, Typography, TextField, Button, Card } from '@mui/material';

const ContactPage: React.FC = () => {
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Contact
      </Typography>
      <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
        <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          required
          type="email"
        />
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Message
        </Button>
      </Box>
      </Card>
    </Box>
  );
};

export default ContactPage;
