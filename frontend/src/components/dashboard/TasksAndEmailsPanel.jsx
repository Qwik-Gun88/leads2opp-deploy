import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';

const cardStyle = {
  p: 3,
  background: '#121e2e',
  borderRadius: 3,
  boxShadow: '0 0 30px #00e6ff99', // Constant glow
  color: '#fff',
  height: '100%',
};

const TasksAndEmailsPanel = () => {
  return (
    <Grid container spacing={4} mt={-2}>
      {/* Tasks Block */}
      <Grid item xs={12} md={6}>
        <Paper sx={cardStyle}>
          <Typography variant="h6" fontWeight={600} mb={2}>📝 Tasks</Typography>
          <Divider sx={{ borderColor: '#00e6ff', mb: 2 }} />
          <Typography variant="body2" mb={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <TaskAltIcon sx={{ fontSize: 18, mr: 1, color: '#00e6ff' }} />
            Follow up with Alice (Product Feedback)
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <TaskAltIcon sx={{ fontSize: 18, mr: 1, color: '#00e6ff' }} />
            Schedule demo for JetBrains team
          </Typography>
        </Paper>
      </Grid>

      {/* Emails & News Block */}
      <Grid item xs={12} md={6}>
        <Paper sx={cardStyle}>
          <Typography variant="h6" fontWeight={600} mb={2}>📬 Emails & News</Typography>
          <Divider sx={{ borderColor: '#00e6ff', mb: 2 }} />
          <Typography variant="body2" mb={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ fontSize: 18, mr: 1, color: '#00e6ff' }} />
            Email summary sent to Globex Corp.
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ fontSize: 18, mr: 1, color: '#00e6ff' }} />
            New lead from LinkedIn engagement
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TasksAndEmailsPanel;
