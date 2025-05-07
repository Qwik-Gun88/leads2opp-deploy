import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import ProfileSettingsPanel from './ProfileSettingsPanel';
import SignatureEditorPanel from "../../components/editor/SignatureEditorPanel";

const tabStyles = {
  '& .MuiTab-root': {
    color: '#94a3b8',
    fontWeight: 600,
  },
  '& .Mui-selected': {
    color: '#38bdf8',
  },
};

const Settings = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: '#0b0f19', color: '#fff', p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#38bdf8', mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3" fontWeight="bold" sx={{ color: '#38bdf8' }}>
          ⚙️ Settings
        </Typography>
      </Box>

      <Paper sx={{ backgroundColor: '#111827', borderRadius: 2, p: 2 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          sx={tabStyles}
        >
          <Tab label="👤 Profile" />
          <Tab label="✍️ Signatures" />
          <Tab label="🔔 Notifications" />
          <Tab label="🔗 Connected Accounts" />
          <Tab label="🔒 Security" />
          <Tab label="🎨 Appearance" />
        </Tabs>

        <Divider sx={{ my: 3, borderColor: '#374151' }} />

        {tab === 0 && <ProfileSettingsPanel />}
        {tab === 1 && <SignatureEditorPanel />}
        {tab === 2 && <Box><Typography variant="h6">Notification Preferences</Typography></Box>}
        {tab === 3 && <Box><Typography variant="h6">Connected Accounts</Typography></Box>}
        {tab === 4 && <Box><Typography variant="h6">Security Settings</Typography></Box>}
        {tab === 5 && <Box><Typography variant="h6">Theme & Appearance</Typography></Box>}
      </Paper>
    </Box>
  );
};

export default Settings;
