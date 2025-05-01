// Pricing.jsx (Updated with Navbar + Theme Consistency)
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    title: 'Starter',
    price: '$49/mo',
    description: 'Perfect for individuals and early-stage teams starting outbound outreach.',
    features: ['Up to 2 sequences', '500 contacts/mo', 'Basic CRM integration', 'Email support'],
  },
  {
    title: 'Growth',
    price: '$149/mo',
    description: 'Ideal for sales teams needing automation and deeper analytics.',
    features: ['Unlimited sequences', '5,000 contacts/mo', 'CRM sync (HubSpot, Salesforce)', 'AI assistant'],
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Custom plans for high-volume orgs with security, onboarding, and SLAs.',
    features: ['Unlimited everything', 'Priority support', 'SSO + SOC2', 'Dedicated CSM'],
  },
];

const Pricing = () => {
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
          💰 Pricing Plans
        </Typography>
        <Grid container spacing={4} mt={4} justifyContent="center">
          {plans.map((plan, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ background: '#121e2e', borderRadius: 4, boxShadow: '0 0 24px #00e6ff33', height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#fff' }}>{plan.title}</Typography>
                  <Typography variant="h6" sx={{ color: '#00e6ff', mb: 1 }}>{plan.price}</Typography>
                  <Typography variant="body2" sx={{ color: '#cfd8dc', mb: 2 }}>{plan.description}</Typography>
                  <ul style={{ paddingLeft: '1.2rem' }}>
                    {plan.features.map((f, idx) => (
                      <li key={idx} style={{ color: '#cfd8dc', marginBottom: '8px', fontSize: '0.9rem' }}>{f}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
