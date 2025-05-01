import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const newsItems = [
  {
    icon: <TrendingUpIcon sx={{ color: '#00e6ff' }} />,
    title: 'Google launches Gemini 1.5 Pro',
  },
  {
    icon: <SecurityIcon sx={{ color: '#00e6ff' }} />,
    title: 'Sophos adds new Ransomware Protection layer',
  },
  {
    icon: <ArticleIcon sx={{ color: '#00e6ff' }} />,
    title: 'AWS/GCP/Databricks integration best practices 2025',
  },
];

const NewsInsightsPanel = () => {
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
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#60a5fa' }}>
          📰 News & Industry Insights
        </Typography>
        <Divider sx={{ borderColor: '#00e6ff', mb: 2 }} />

        <List dense>
          {newsItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  sx: {
                    color: '#b0bec5',
                    fontSize: '0.9rem',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default NewsInsightsPanel;
