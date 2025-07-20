import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Contact
      </Typography>
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
    </Container>
  );
};

export default ContactPage;
