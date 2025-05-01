import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const AnalyticsReporting = () => {
  useEffect(() => {
    document.title = 'Analytics & Reporting | leads2opp';
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0b0f19, #1c2531)', color: 'white' }}>
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Analytics & Reporting
        </Typography>
        <Typography variant="body1" color="#b0bec5">
          View call statistics, email engagement, and conversion insights.
        </Typography>
      </Container>
    </Box>
  );
};

export default AnalyticsReporting;
