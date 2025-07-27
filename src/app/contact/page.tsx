'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CircularProgress, Alert } from '@mui/material';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('メッセージの送信に失敗しました。');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || '不明なエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

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
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              required
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Send Message'}
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ContactPage;