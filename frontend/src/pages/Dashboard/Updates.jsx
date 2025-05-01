import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import logo from '/assets/logo.png'; 

const Updates = () => {
  const [sequences, setSequences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedSequences')) || [];
    setSequences(saved);
  }, []);

  const handleCreate = () => {
    navigate('/design-sequence');
  };

  const handleEdit = (sequence) => {
    localStorage.setItem('lastSequence', JSON.stringify(sequence));
    navigate('/design-sequence');
  };

  const handleDelete = (createdAt) => {
    const updated = sequences.filter(seq => seq.createdAt !== createdAt);
    setSequences(updated);
    localStorage.setItem('savedSequences', JSON.stringify(updated));
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0b0f19, #1c2531)', color: '#fff' }}>
      {/* 🔝 Top AppBar */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#0b0f19', px: 3 }}>
  <Toolbar sx={{ justifyContent: 'space-between', px: 4, flexWrap: 'wrap' }}>
    {/* Logo and Brand */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
      onClick={() => navigate('/')}
    >
      <img src={logo} alt="leads2opp logo" style={{ height: 80 }} />
      <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', ml: 1 }}>
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

    {/* Center Navigation */}
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
      <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
      <Button color="inherit" onClick={() => navigate('/contacts-manager')}>Contacts Manager</Button>
      <Button color="inherit" onClick={() => navigate('/analytics')}>Analytics</Button>
    </Box>

    {/* Right Icons */}
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton color="inherit">🔔</IconButton>
      <IconButton color="inherit">⚙️</IconButton>
      <IconButton color="inherit">👤</IconButton>
    </Box>
  </Toolbar>
</AppBar>

      {/* 📋 Sequences Section */}
      <Box sx={{ px: 6, py: 8 }}>
        <Typography variant="h4" fontWeight={600} mb={4}>
          📋 Saved Sequences & Pending Tasks
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{
            color: '#90caf9',
            borderColor: '#90caf9',
            '&:hover': {
              backgroundColor: '#1e293b',
              borderColor: '#90caf9',
            },
            mb: 4,
          }}
        >
          + Create New Sequence
        </Button>

        {sequences.length === 0 ? (
          <Typography variant="body1" color="#90a4ae">
            No saved sequences yet.
          </Typography>
        ) : (
          <Paper sx={{ backgroundColor: '#121e2e', color: '#fff' }}>
            <List>
              {sequences.map((seq, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom: '1px solid #2c3e50',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <ListItemText
                    primary={seq.name}
                    secondary={`Steps: ${seq.nodes?.length || 0} • Created: ${seq.createdAt || 'Unknown'}`}
                    sx={{ color: '#cfd8dc' }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => handleEdit(seq)} sx={{ color: '#90caf9' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(seq.createdAt)} sx={{ color: '#ef5350' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Updates;
