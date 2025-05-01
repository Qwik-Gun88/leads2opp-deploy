import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  Chip,
} from '@mui/material';

const callTokens = [
  'First Name',
  'Company',
  'Pain Point',
  'Product Pitch',
  'Objection Handling',
  'Next Steps',
];

const CallEditorPanel = ({ stepName = 'Call 1', onGenerate, onSave }) => {
  const [script, setScript] = useState('');

  const insertToken = (token) => {
    const formattedToken = `{{${token}}}`;
    setScript((prev) => prev + ' ' + formattedToken);
  };

  return (
    <Box sx={{ background: '#111827', p: 4, borderRadius: 2, color: '#fff' }}>
      <Typography variant="h6" gutterBottom>
        📞 Editing: {stepName}
      </Typography>

      <TextField
        fullWidth
        label="Call Script"
        variant="outlined"
        multiline
        rows={12}
        value={script}
        onChange={(e) => setScript(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{ sx: { color: '#fff', background: '#1f2937' } }}
      />

      <Typography variant="body2" color="gray" sx={{ mb: 1 }}>
        🔖 Insert Tokens:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {callTokens.map((token) => (
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
          onClick={() => onGenerate({ script })}
          sx={{ background: '#4f46e5' }}
        >
          ⚡ Generate with AI
        </Button>
        <Button
          variant="outlined"
          onClick={() => onSave({ script })}
          sx={{ borderColor: '#4f46e5', color: '#c7d2fe' }}
        >
          💾 Save Call
        </Button>
      </Box>
    </Box>
  );
};

export default CallEditorPanel;