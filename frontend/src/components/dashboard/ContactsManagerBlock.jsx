import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useNavigate } from 'react-router-dom';

const ContactsManagerBlock = () => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      onClick={() => navigate('/contacts-manager')}
      sx={{
        width: 320,
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
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <CloudUploadIcon sx={{ fontSize: 30, color: '#1976d2' }} />
        <CloudDownloadIcon sx={{ fontSize: 30, color: '#1976d2' }} />
      </Box>
      <Typography variant="h6" sx={{ mt: 1 }}>Contacts Manager</Typography>
      <Typography variant="body2" color="text.secondary">
        Upload/download contacts, CRM sync
      </Typography>
    </Paper>
  );
};

export default ContactsManagerBlock;
