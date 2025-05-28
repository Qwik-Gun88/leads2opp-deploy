// 🚀 Leads2Opp Reimagined Homepage (2026 Upgrade)
import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, Container,
  Grid, Tabs, Tab, Card, CardContent, Divider
} from '@mui/material';
import { AutoAwesome, Diamond, Bolt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [aiEvent, setAiEvent] = useState('Maria booked 2 demos from her latest campaign.');
  const taglines = [
    'AI-Powered Sales Sequences',
    'Close More, Click Less',
    'Smarter Outreach at Scale'
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tickerEvents = [
      'Nathan booked 3 demos today.',
      'Elena launched a new LinkedIn campaign.',
      'Ryan got 14 replies this morning.',
    ];
    const tickerInterval = setInterval(() => {
      setAiEvent(tickerEvents[Math.floor(Math.random() * tickerEvents.length)]);
    }, 8000);
    return () => clearInterval(tickerInterval);
  }, []);

  const videoList = [
    'Sequencingvideo.mp4',
    'Autodialer.mp4',
    'Analytics.mp4',
    'CRMSync.mp4',
  ];
  const videoTitles = [
    'Sequence Creator',
    'Auto Dialer',
    'Analytics & Insights',
    'CRM Sync',
  ];  
  
  const [rollingVideoIndex, setRollingVideoIndex] = useState(0);
  
  useEffect(() => {
    const videoTimer = setInterval(() => {
      setRollingVideoIndex((prev) => (prev + 1) % videoList.length);
    }, 15000); // ⏱ every 10 seconds
    return () => clearInterval(videoTimer);
  }, []);
  
  return (
    <>
      <style>
        {`
          .glow-title {
            background: linear-gradient(270deg, #00e6ff, #8b5cf6, #facc15, #00e6ff);
            background-size: 800% 800%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: glowCycle 6s ease infinite;
          }

          @keyframes glowCycle {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <Box sx={{ background: '#0b0f19', color: 'white', minHeight: '100vh' }}>
        {/* Futuristic AppBar */}
        <AppBar
  position="static"
  sx={{
    background: 'rgba(10, 14, 28, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 30px #00e6ff44',
    borderBottom: '1px solid #1e2a38',
    height: 80,
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <Toolbar sx={{ justifyContent: 'center' }}>
    <Box display="flex" gap={4}>
      {['About', 'Features', 'Pricing', 'Careers', 'Contact'].map((label, index) => (
        <Button
          key={label}
          onClick={() => navigate(`/${label.toLowerCase()}`)}
          sx={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: '#e0f7fa',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease-in-out',
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              height: '3px',
              background: 'linear-gradient(to right, #00e6ff, #8b5cf6)',
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              transition: 'transform 0.3s ease',
              mt: '4px',
              borderRadius: '3px',
            },
            '&:hover': {
              color: '#00e6ff',
            },
            '&:hover:after': {
              transform: 'scaleX(1)',
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  </Toolbar>
</AppBar>


        {/* Hero Section */}
        <Container sx={{ py: 4, textAlign: 'center' }}>
        <Box
    component="img"
    src="/assets/logo.png"
    alt="Leads2Opp logo"
    sx={{
      height: 200, // ⬅️ Increased from 100 to 120
      mb: -6,
      filter: 'drop-shadow(0 0 10px #00e6ff88)',
    }}
  />

          <Typography
            variant="h2"
            className="glow-title"
            sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.5rem' }, mb: 1 }}
          >
            {taglines[taglineIndex]}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate('/app')}
            sx={{
              mt: 4,
              px: 6,
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 3,
              fontSize: '1rem',
              background: 'linear-gradient(to right, #00b4d8, #0077b6)',
              boxShadow: '0 0 20px #00b4d8',
              '&:hover': {
                background: 'linear-gradient(to right, #0077b6, #00e6ff)',
                boxShadow: '0 0 30px #00e6ff',
              },
            }}
          >
            🚀 LAUNCH LIVE DEMO
          </Button>
        </Container>

        {/* Video Feature Tabs */}
        <Container sx={{ mt: 4 }}>
  <Typography
    variant="h4"
    fontWeight={700}
    textAlign="center"
    mb={3}
    sx={{
      color: '#00e6ff',
      textShadow: '0 0 10px #00e6ff66',
    }}
  >
    🎥 Platform Showcase
  </Typography>
  <Typography
  variant="h6"
  align="center"
  mt={2}
  sx={{
    color: '#00e6ff',
    fontWeight: 'bold',
    textShadow: '0 0 12px #00e6ff',
    animation: 'glowPulse 2s ease-in-out infinite',
  }}
>
  🎬 Now Showing: {videoTitles[rollingVideoIndex]}
</Typography>

<Box display="flex" justifyContent="center">
    <video
      key={rollingVideoIndex}
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: '70%',
        borderRadius: '12px',
        boxShadow: '0 0 24px #00e6ff44',
      }}
    >
      <source
        src={`/assets/${videoList[rollingVideoIndex]}`}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </Box>
</Container>
        {/* Differentiator Section */}
        <Box sx={{ background: '#1c2531', py: 8 }}>
          <Container>
            <Typography variant="h5" fontWeight={600} textAlign="center" mb={4}>
              💡 What Makes Leads2Opp Different?
            </Typography>
            <Grid container spacing={4}>
              {[{
                title: 'Smart Branching Logic',
                text: 'Create personalized multi-step journeys with AI-driven triggers.',
              }, {
                title: 'Live Call AI Coaching',
                text: 'AI listens in and suggests live objections handling or scripts.',
              }, {
                title: 'End-to-End CRM Sync',
                text: 'Works seamlessly with Clay, HubSpot, Salesforce & more.',
              }, {
                title: 'Visual Campaign Designer',
                text: 'No-code flow builder with real-time analytics overlays.',
              }].map((block, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card sx={{ background: '#121e2c', borderRadius: 4, color: '#fff', boxShadow: '0 0 30px #00e6ff22', p: 2 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>{block.title}</Typography>
                      <Divider sx={{ my: 1, borderColor: '#00e6ff66' }} />
                      <Typography variant="body2" color="#cfd8dc">{block.text}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', py: 4, backgroundColor: '#0b0f1a', color: '#90a4ae' }}>
          © {new Date().getFullYear()} leads2opp · Built with 💡 and ☕️
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
