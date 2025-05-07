import React, { useState } from 'react';
import { Box, InputBase, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const AIPromptBar = ({ onGenerate, sx = {} }) => {
  const [input, setInput] = useState('');

  const handleGenerate = () => {
    if (input.trim()) {
      onGenerate(input.trim());
      setInput('');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
        px: 2,
        py: 1,
        backgroundColor: '#f8fafc',
        ...sx, // Apply additional styles if passed
      }}
    >
      <InputBase
        placeholder="What would you like AI to generate?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          flex: 1,
          color: '#38bdf8', // Default input font color
          '&::placeholder': {
            color: '#38bdf8',
          },
          '&:focus': {
            color: '#38bdf8',
          },
          '&::selection': {
            backgroundColor: '#334155',
            color: '#38bdf8',
          },
        }}
      />
      <IconButton onClick={handleGenerate}>
        <SendIcon sx={{ color: '#10b981' }} />
      </IconButton>
    </Paper>
  );
};

export default AIPromptBar;
