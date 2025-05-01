import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '/assets/logo.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Contacts Manager', path: '/contacts-manager' },
  { label: 'Contacts Centre', path: '/contacts-centre' },
  { label: 'Analytics', path: '/analytics-reporting' },
];

const HeaderAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(to right, #0b0f19, #0f1b2c)',
        borderBottom: '1px solid #1e2a38',
        boxShadow: '0 0 20px rgba(0, 230, 255, 0.05)',
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, flexWrap: 'wrap' }}>
        {/* Logo & Brand */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.03)' },
          }}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="leads2opp logo" style={{ height: 50 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', ml: 1 }}>
            <span style={{ color: '#3b82f6' }}>Leads</span>
            <span
              style={{
                background: 'linear-gradient(to right, #8b5cf6, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 4px',
              }}
            >
              2
            </span>
            <span style={{ color: '#fb923c' }}>opp</span>
          </Typography>
        </Box>

        {/* Center Nav */}
        <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, flexWrap: 'wrap', mt: { xs: 1, md: 0 } }}>
          {navLinks.map(({ label, path }) => {
            if (location.pathname === path) return null; // hide current page
            return (
              <Button
                key={label}
                onClick={() => navigate(path)}
                sx={{
                  color: '#ffffff',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        {/* Right Icons */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {[<NotificationsIcon />, <SettingsIcon />, <AccountCircleIcon />].map((icon, index) => (
            <IconButton
              key={index}
              color="inherit"
              sx={{
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
