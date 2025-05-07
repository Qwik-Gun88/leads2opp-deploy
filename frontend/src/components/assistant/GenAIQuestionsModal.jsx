import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const GenAIQuestionsModal = ({ open, onClose, onSubmit, questions }) => {
  const [answers, setAnswers] = useState([]);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    onSubmit(answers);
    onClose();
    setAnswers([]); // Clear for next use
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>🤖 AI Setup – Just a Few Quick Questions</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {questions.map((q, index) => (
            <TextField
              key={index}
              label={q}
              value={answers[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              fullWidth
              multiline
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Continue</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenAIQuestionsModal;
