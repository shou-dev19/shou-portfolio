'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card } from '@mui/material';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Contact
      </Typography>
      <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
        {submitted ? (
          <Typography variant="h6" color="primary" sx={{ textAlign: 'center', my: 4 }}>
            お問い合わせありがとうございます！
            <br />
            メッセージが正常に送信されました。
          </Typography>
        ) : (
          <Box component="form" noValidate autoComplete="off" onSubmit={(e) => {
            e.preventDefault();
            // ここに実際のフォーム送信ロジック（API呼び出しなど）を追加
            setSubmitted(true);
          }}>
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
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Message
        </Button>
      </Box>
        )}
      </Card>
    </Box>
  );
};

export default ContactPage;
