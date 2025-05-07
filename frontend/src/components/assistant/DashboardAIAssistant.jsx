import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DocumentUploader from "./DocumentUploader";

const DashboardAIAssistant = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [uploadedNotes, setUploadedNotes] = useState('');


  const handleGenerateSequence = async () => {
    if (!inputText.trim() && !uploadedNotes.trim()) return;
  
    setLoading(true);
    try {
      const combinedInput = `${inputText}\n\n${uploadedNotes}`;
      navigate('/design-sequence', {
        state: {
          from: 'dashboard',
          userIntent: combinedInput,
        },
      });
    } catch (err) {
      console.error('AI Assistant error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        height: '80%',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: 'white',
        borderRadius: 3,
        boxShadow: '0 0 20px #00e6ff55',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#60a5fa' }}>
          🤖 What's on your mind today?
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#94a3b8' }}>
          Tell Leads2Opp Assistant your goal. Optionally upload a document too.
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your goal..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          InputProps={{ sx: { background: '#1f2937', color: 'white' } }}
          sx={{ mb: 3 }}
        />

<DocumentUploader onUpload={(text) => setUploadedNotes(text)} />
      </Box>

      <Button
        variant="contained"
        color="info"
        onClick={handleGenerateSequence}
        disabled={loading}
        sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
      >
        {loading ? 'Thinking...' : '✨ Generate Sequence'}
      </Button>
    </Paper>
  );
};

export default DashboardAIAssistant;
