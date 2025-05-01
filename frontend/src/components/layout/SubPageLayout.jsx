import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const SubPageLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'center', gap: 4 }}>
          {/* Contacts Centre */}
          <IconButton color="primary" onClick={() => navigate('/contacts-centre')}>
            <PeopleAltIcon />
            <Typography variant="caption" sx={{ ml: 1 }}>Contacts</Typography>
          </IconButton>

          {/* Analytics & Reporting */}
          <IconButton color="primary" onClick={() => navigate('/analytics-reporting')}>
            <BarChartIcon />
            <Typography variant="caption" sx={{ ml: 1 }}>Analytics</Typography>
          </IconButton>

          {/* Contacts Manager */}
          <IconButton color="primary" onClick={() => navigate('/contacts-manager')}>
            <CloudUploadIcon />
            <Typography variant="caption" sx={{ ml: 1 }}>Manager</Typography>
          </IconButton>

          {/* Home Navigation */}
          <IconButton color="primary" onClick={() => navigate('/')}>
            <HomeIcon />
            <Typography variant="caption" sx={{ ml: 1 }}>Home</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main content below the nav bar */}
      <Box sx={{ mt: 4 }}>{children}</Box>
    </Box>
  );
};

export default SubPageLayout;
