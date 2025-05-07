import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  Button,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '/assets/logo.png';

const DashboardAppBar = () => {
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

        {/* Navigation Actions */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Creative Centre as Button */}
          {location.pathname !== '/creative-centre' && (
            <Button
              onClick={() => navigate('/creative-centre')}
              variant="contained"
              sx={{
                backgroundColor: '#3b82f6',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 2,
                '&:hover': { backgroundColor: '#2563eb' },
              }}
            >
              🎨 Creative Centre
            </Button>
          )}

          {/* Icons for other routes */}
          <Tooltip title="Notifications">
            <IconButton sx={{ color: '#fff' }}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={() => navigate('/settings')} sx={{ color: '#fff' }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton sx={{ color: '#fff' }}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppBar;
