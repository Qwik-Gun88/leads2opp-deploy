import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Chip,
  Divider,
} from '@mui/material';

const personalizationTokens = [
  'First Name',
  'Company',
  'Industry',
  'Account Owner',
  'Calendar Link',
  'Email',
];

const EmailEditorPanel = ({ stepName = 'Email 1', onGenerate, onSave }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const insertToken = (token) => {
    const formattedToken = `{{${token}}}`;
    setBody((prev) => prev + ' ' + formattedToken);
  };

  return (
    <Box sx={{ background: '#111827', p: 4, borderRadius: 2, color: '#fff' }}>
      <Typography variant="h6" gutterBottom>
        ✉️ Editing: {stepName}
      </Typography>

      <TextField
        fullWidth
        label="Subject"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{ sx: { color: '#fff', background: '#1f2937' } }}
      />

      <TextField
        fullWidth
        label="Body"
        variant="outlined"
        multiline
        rows={10}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{ sx: { color: '#fff', background: '#1f2937' } }}
      />

      <Typography variant="body2" color="gray" sx={{ mb: 1 }}>
        🔖 Insert Tokens:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {personalizationTokens.map((token) => (
          <Chip
            key={token}
            label={token}
            onClick={() => insertToken(token)}
            sx={{ background: '#334155', color: '#fff', cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2, borderColor: '#374151' }} />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => onGenerate({ subject, body })}
          sx={{ background: '#4f46e5' }}
        >
          ⚡ Generate with AI
        </Button>
        <Button
          variant="outlined"
          onClick={() => onSave({ subject, body })}
          sx={{ borderColor: '#4f46e5', color: '#c7d2fe' }}
        >
          💾 Save Email
        </Button>
      </Box>
    </Box>
  );
};

export default EmailEditorPanel;
