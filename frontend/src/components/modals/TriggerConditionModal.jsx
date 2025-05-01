// TriggerConditionModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const TriggerConditionModal = ({
  open,
  onClose,
  onSubmit,
  openedCount,
  clickedCount,
  setOpenedCount,
  setClickedCount,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Trigger Condition</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ mr: 2 }}>Opened</Typography>
          <Button onClick={() => setOpenedCount(Math.max(0, openedCount - 1))}>-</Button>
          <Typography sx={{ mx: 1 }}>{openedCount}</Typography>
          <Button onClick={() => setOpenedCount(openedCount + 1)}>+</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 2 }}>Clicked</Typography>
          <Button onClick={() => setClickedCount(Math.max(0, clickedCount - 1))}>-</Button>
          <Typography sx={{ mx: 1 }}>{clickedCount}</Typography>
          <Button onClick={() => setClickedCount(clickedCount + 1)}>+</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TriggerConditionModal;