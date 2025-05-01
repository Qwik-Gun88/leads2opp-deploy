// Features.jsx (Updated with Home Link + Fixed Text Contrast)
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'AI Sales Sequences',
    description: 'Automate multi-step cadences triggered by real-time contact engagement.',
  },
  {
    title: 'Live Auto-Dialer',
    description: 'Parallel dial contacts with real-time transcripts and AI-powered coaching.',
  },
  {
    title: 'Smart CRM Sync',
    description: 'Two-way sync with tools like Clay, Salesforce, and HubSpot.',
  },
  {
    title: 'Visual Campaign Designer',
    description: 'No-code drag-and-drop builder with branching and conditional logic.',
  },
  {
    title: 'AI Email + Script Generator',
    description: 'Generate hyper-personalized emails, call scripts, and messages using AI.',
  },
  {
    title: 'Analytics + Leaderboards',
    description: 'See what’s working, measure performance, and optimize campaigns fast.',
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: '#0b0f19', color: 'white', minHeight: '100vh' }}>
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

      <Container sx={{ py: 10 }}>
        <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
          ✨ Features That Set Us Apart
        </Typography>
        <Grid container spacing={4} mt={4}>
          {features.map((f, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ background: '#121e2e', borderRadius: 4, boxShadow: '0 0 20px #00e6ff22', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cfd8dc' }}>
                    {f.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
