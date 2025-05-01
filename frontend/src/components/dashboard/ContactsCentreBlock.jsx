// ContactsCentreBlock.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';

const ContactsCentreBlock = () => {
  const navigate = useNavigate();

  return (
    <Paper
  elevation={3}
  onClick={() => navigate('/your-route')}
  sx={{
    width: 300, // 
    height: 200,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 6,
    },
  }}
>
      <PeopleAltIcon sx={{ fontSize: 60, color: '#1976d2' }} />
      <Typography variant="h6" sx={{ mt: 2 }}>Contacts Centre</Typography>
      <Typography variant="body2" color="text.secondary">
        Auto-dialing, bulk email, one-off outreach
      </Typography>
    </Paper>
  );
};

export default ContactsCentreBlock;