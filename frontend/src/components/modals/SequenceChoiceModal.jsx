// src/components/modals/SequenceChoiceModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography
} from '@mui/material';

// ✅ Rename these to match how they're passed in
const SequenceChoiceModal = ({ open, onClose, onCreateNew, onClone, onAssignExisting }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Select an Option</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Button variant="contained" fullWidth onClick={onCreateNew}>
              ➕ Create New Sequence
            </Button>
            <Button variant="outlined" fullWidth onClick={onClone}>
              📋 Clone Existing Sequence
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={onAssignExisting}>
              🤖 Use AI-Generated Template
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };
  

export default SequenceChoiceModal;
