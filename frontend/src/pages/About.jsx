// About.jsx (Refined with Professional Style + Layout)
import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: '#0b0f19', color: '#cfd8dc' }}>
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

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
          🚀 About Leads2Opp
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 6, textAlign: 'center' }}>
          At Leads2Opp, we’re on a mission to redefine outbound sales with AI-first automation and authentic human connection.
        </Typography>

        <Grid container spacing={4}>
          {[{
            title: 'Our Mission',
            text: 'Empower sales teams to engage smarter and scale outreach with confidence, using AI that acts like your best rep — not a robot.'
          }, {
            title: 'Our Vision',
            text: 'To become the go-to growth engine for B2B sales, helping teams convert leads to opportunities faster than ever before.'
          }, {
            title: 'Our Values',
            text: 'We value innovation, transparency, speed, and customer success. Everything we build is crafted to help you close more with less effort.'
          }].map((block, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ background: '#121e2e', borderRadius: 4, boxShadow: '0 0 20px #00e6ff22', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#ffffff' }}>{block.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#cfd8dc' }}>{block.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={8} textAlign="center">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Want to learn more?
          </Typography>
          <Typography variant="body2" sx={{ color: '#90caf9' }}>
            Reach out via our <span style={{ color: '#00e6ff', cursor: 'pointer' }} onClick={() => navigate('/contact')}>Contact</span> page or book a live demo.
          </Typography>
        </Box>

        <Box mt={10}>
          <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
            💬 What Our Users Are Saying
          </Typography>
          <Grid container spacing={4} mt={2}>
            {[{
              name: 'Sarah T.',
              quote: 'Leads2Opp helped us scale outbound like never before. We booked 3x more meetings in the first month.'
            }, {
              name: 'James M.',
              quote: 'The AI sequence builder and CRM sync is game-changing. Our reps save hours every week.'
            }, {
              name: 'Amina R.',
              quote: 'It feels like a sales co-pilot. The real-time coaching is exactly what our SDRs needed.'
            }].map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ background: '#121e2e', borderRadius: 3, boxShadow: '0 0 18px #00e6ff22', p: 2 }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ color: '#cfd8dc', fontStyle: 'italic' }}>
                      “{t.quote}”
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mt: 2, color: '#00e6ff' }}>
                      — {t.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
