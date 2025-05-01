// Contact.jsx (Updated with AppBar + Theme Match)
import React from 'react';
import { Box, Container, Typography, TextField, Button, Stack, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: '#0b0f19', color: 'white' }}>
      <AppBar position="static" sx={{ background: 'rgba(10, 14, 28, 0.95)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px #00e6ff33', borderBottom: '1px solid #1e2a38' }}>
        <Toolbar sx={{ justifyContent: 'center', gap: 5 }}>
          {['Home', 'About', 'Features', 'Pricing', 'Careers', 'Contact'].map((label) => (
            <Button
              key={label}
              sx={{
                color: '#cfd8dc',
                fontWeight: 500,
                fontSize: '1rem',
                '&:hover': { color: '#00e6ff', transform: 'scale(1.05)' },
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate(label === 'Home' ? '/' : `/${label.toLowerCase()}`)}
            >
              {label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          📬 Contact Us
        </Typography>
        <Typography variant="body2" color="#cfd8dc" mb={4}>
          Got a question? Interested in a demo? Just want to say hi? Fill out the form below and we’ll be in touch!
        </Typography>
        <Stack spacing={3}>
          <TextField fullWidth label="Your Name" variant="outlined" InputLabelProps={{ style: { color: '#cfd8dc' } }} InputProps={{ style: { color: 'white', background: '#1c2531' } }} />
          <TextField fullWidth label="Email Address" variant="outlined" InputLabelProps={{ style: { color: '#cfd8dc' } }} InputProps={{ style: { color: 'white', background: '#1c2531' } }} />
          <TextField fullWidth multiline rows={4} label="Message" variant="outlined" InputLabelProps={{ style: { color: '#cfd8dc' } }} InputProps={{ style: { color: 'white', background: '#1c2531' } }} />
          <Button variant="contained" sx={{ mt: 2, fontWeight: 'bold', background: 'linear-gradient(to right, #00b4d8, #0077b6)', boxShadow: '0 0 14px #00e6ff55' }}>
            Send Message
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
