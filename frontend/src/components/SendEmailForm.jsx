import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const SendEmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body }),
      });

      const data = await res.json();
      setStatus(data.message || data.error);
    } catch (err) {
      setStatus('Failed to send email');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Send Test Email
      </Typography>
      <TextField
        label="To"
        fullWidth
        margin="normal"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <TextField
        label="Subject"
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextField
        label="Body"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button variant="contained" onClick={handleSend} sx={{ mt: 2 }}>
        Send Email
      </Button>
      {status && (
        <Typography sx={{ mt: 2 }} color={status.includes('success') ? 'green' : 'error'}>
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default SendEmailForm;
