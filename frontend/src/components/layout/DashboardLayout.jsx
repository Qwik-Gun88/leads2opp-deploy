import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Divider,
  Container
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import NewsInsightsPanel from "../dashboard/NewsInsightsPanel";
import DashboardAIAssistant from "../assistant/DashboardAIAssistant";
import TasksAndEmailsPanel from "../dashboard/TasksAndEmailsPanel";
import DashboardAppBar from '../../components/layout/DashboardAppBar';


const cardStyle = {
  p: 3,
  background: '#121e2e',
  borderRadius: 3,
  boxShadow: '0 0 15px rgba(0,255,255,0.1)',
  color: '#fff',
  height: 100, // 👈 fixed height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};


const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard | leads2opp';
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: 'url("/assets/bg-circuit-strong.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      color: '#fff',
    }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11, 15, 26, 0.92)', zIndex: 0 }} />
      <DashboardAppBar />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 8 }}>

        {/* Top Row */}
        <Grid container spacing={2} mt={0} alignItems="stretch">
          <Grid item xs={12} md={4}><DashboardAIAssistant /></Grid>

          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" onClick={() => navigate('/design-sequence')} sx={{ background: 'linear-gradient(135deg, #00e6ff, #00bfff)', color: '#000', fontWeight: 'bold' }}>➕ New Sequence</Button>
              <Button variant="contained" onClick={() => navigate('/auto-dialer')} sx={{ background: 'linear-gradient(135deg, #00e6ff, #00bfff)', color: '#000', fontWeight: 'bold' }}>☎️ Launch Auto-Dialer</Button>
              <Button variant="contained" onClick={() => navigate('/updates')} sx={{ background: 'linear-gradient(135deg, #00e6ff, #00bfff)', color: '#000', fontWeight: 'bold' }}>📋 View Sequences</Button>

              <Grid container spacing={1} mt={2}>
                {[{ label: 'Hot Leads', value: 36 }, { label: 'Calls This Week', value: 128 }, { label: 'Open Rate', value: '45%' }].map((stat, i) => (
                  <Grid item xs={12} key={i}>
                    <Paper sx={{ px: 1.5, py: 0.5, textAlign: 'center', background: '#0f172a', color: '#fff', borderRadius: 2, boxShadow: '0 0 12px rgba(0,255,255,0.15)', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography fontWeight="bold" fontSize="0.95rem">{stat.value}</Typography>
                      <Typography color="#90caf9" fontSize="0.7rem">{stat.label}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}><NewsInsightsPanel /></Grid>
        </Grid>

        {/* Middle Row */}
<Grid container spacing={1} mt={2}>
  {/* Contacts Centre */}
  <Grid item xs={12} md={4}>
    <Paper
     sx={{
      ...cardStyle,
      cursor: 'pointer',
      boxShadow: '0 0 30px #00e6ff99', // ✅ Constant glow
    }}
      onClick={() => navigate('/contacts-centre')}
    >
      <PeopleAltIcon sx={{ fontSize: 60, color: '#00e6ff' }} />
      <Typography variant="h6" mt={2}>Contacts Centre</Typography>
      <Typography variant="body2" color="#b0bec5">
        Auto-dialing, bulk email, one-off outreach
      </Typography>
    </Paper>
  </Grid>

  {/* Analytics & Reporting */}
  <Grid item xs={12} md={4}>
    <Paper
      sx={{
        ...cardStyle,
        cursor: 'pointer',
        boxShadow: '0 0 30px #00e6ff99', // ✅ Constant glow
      }}
      onClick={() => navigate('/analytics-reporting')}
    >
      <BarChartIcon sx={{ fontSize: 60, color: '#00e6ff' }} />
      <Typography variant="h6" mt={2}>Analytics & Reporting</Typography>
      <Typography variant="body2" color="#b0bec5">
        Call stats, email engagement, trends
      </Typography>
    </Paper>
  </Grid>

  {/* Contacts Manager */}
  <Grid item xs={12} md={4}>
    <Paper
      sx={{
        ...cardStyle,
        cursor: 'pointer',
        boxShadow: '0 0 30px #00e6ff99', // ✅ Constant glow
      }}
      onClick={() => navigate('/contacts-manager')}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, height: 60 }}>
        <CloudUploadIcon sx={{ fontSize: 60, color: '#00e6ff' }} />
        <CloudDownloadIcon sx={{ fontSize: 60, color: '#00e6ff' }} />
      </Box>
      <Typography variant="h6" mt={2}>Contacts Manager</Typography>
      <Typography variant="body2" color="#b0bec5">
        Upload/download contacts, CRM sync
      </Typography>
    </Paper>
  </Grid>
</Grid>
        {/* Bottom Row */}
        <TasksAndEmailsPanel />
      </Container>
    </Box>
  );
};

export default DashboardLayout;
