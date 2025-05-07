import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, Divider, Button } from '@mui/material';
import EmailEditorPanel from '../../components/editor/EmailEditorPanel';
import CallEditorPanel from '../../components/editor/CallEditorPanel';
import TextEditorPanel from '../../components/editor/TextEditorPanel';
import SignatureEditorPanel from '../../components/editor/SignatureEditorPanel';
import DashboardAIAssistant from '../../components/assistant/DashboardAIAssistant';
import { useNavigate } from 'react-router-dom';

const CreativeCentre = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleGenerateAI = (type) => {
    console.log(`⚡ Generate AI for: ${type}`);
  };

  const handleSave = (type, content) => {
    console.log(`💾 Saving ${type} content`, content);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #0b0f19, #0e1826)', color: '#fff', p: 4 }}>
      
      <Button
        variant="outlined"
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 2, borderColor: '#38bdf8', color: '#38bdf8', fontWeight: 500 }}
      >
        ← Back to Dashboard
      </Button>

      <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#38bdf8', mb: 4 }}>
        🎨 Creative Centre
      </Typography>

      <Paper sx={{ backgroundColor: '#111827', borderRadius: 2, p: 2 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          centered
          sx={{
            '& .MuiTab-root': {
              color: '#94a3b8',
              fontWeight: 600,
            },
            '& .Mui-selected': {
              color: '#38bdf8',
            },
          }}
        >
          <Tab label="✉️ Email Template" />
          <Tab label="📞 Call Script" />
          <Tab label="💬 Text Message" />
          <Tab label="🖋️ Signature Manager" />
        </Tabs>

        <Divider sx={{ my: 3, borderColor: '#374151' }} />

        {tab === 0 && (
          <EmailEditorPanel
            stepName="Email Template"
            showSignatureSelector={true}
            onGenerate={() => handleGenerateAI('email')}
            onSave={(content) => handleSave('email', content)}
          />
        )}

        {tab === 1 && (
          <CallEditorPanel
            stepName="Call Script"
            onGenerate={() => handleGenerateAI('call')}
            onSave={(content) => handleSave('call', content)}
          />
        )}

        {tab === 2 && (
          <TextEditorPanel
            stepName="Text Message"
            onGenerate={() => handleGenerateAI('text')}
            onSave={(content) => handleSave('text', content)}
          />
        )}

        {tab === 3 && (
          <SignatureEditorPanel />
        )}
      </Paper>

      <DashboardAIAssistant />
    </Box>
  );
};

export default CreativeCentre;
