import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { useNavigate } from 'react-router-dom';
import HeaderAppBar from '../../components/layout/HeaderAppBar';

const actionCards = [
  {
    icon: <CloudUploadIcon sx={{ fontSize: 40, color: '#64b5f6' }} />,
    title: 'Upload Contacts',
    description: 'Import your CSV file or sync contacts from your CRM.',
    action: 'Upload Now',
    onClick: () => alert('Upload functionality coming soon!'),
  },
  {
    icon: <CloudDownloadIcon sx={{ fontSize: 40, color: '#81c784' }} />,
    title: 'Export Contacts',
    description: 'Export selected contacts for external outreach or reporting.',
    action: 'Export List',
    onClick: () => alert('Export functionality coming soon!'),
  },
  {
    icon: <IntegrationInstructionsIcon sx={{ fontSize: 40, color: '#ba68c8' }} />,
    title: 'CRM Integration',
    description: 'Connect to HubSpot, Salesforce, or sync with Clay via API key.',
    action: 'Connect to CRM',
    onClick: () => alert('Open CRM connection modal or settings'),
  },
];

const ContactsManager = () => {
  const navigate = useNavigate();
  const [enrichEnabled, setEnrichEnabled] = useState(true);

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #0b0f19, #121e2e)', minHeight: '100vh', color: 'white' }}>
      <HeaderAppBar />
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          📁 Contacts Manager
        </Typography>

        {/* Smart Enrichment Preview Block */}
        <Paper sx={{ p: 3, mb: 4, backgroundColor: '#1c2a38', borderRadius: 3, boxShadow: '0 0 30px rgba(0,230,255,0.1)' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6" fontWeight={600} mb={1}>⚡ Smart Enrichment</Typography>
              <Typography variant="body2" color="#cfd8dc">
                Enrich imported contacts with LinkedIn profiles, job titles, company websites, and industry classification — automatically.
              </Typography>
            </Box>
            <FormControlLabel
              control={<Switch checked={enrichEnabled} onChange={() => setEnrichEnabled(!enrichEnabled)} color="info" />}
              label={<Typography color="#cfd8dc">Enrich on upload</Typography>}
              labelPlacement="start"
              sx={{ ml: 2 }}
            />
          </Box>
        </Paper>

        {/* AI Suggestions for Segments Panel */}
        <Paper sx={{ p: 2, mb: 4, backgroundColor: '#0f172a', borderLeft: '4px solid #00e6ff', boxShadow: '0 0 15px rgba(0,230,255,0.15)' }}>
          <Typography variant="body2" color="#cfd8dc">
            🧠 It looks like <strong>46%</strong> of your contacts are CTOs — consider creating a high-impact outreach campaign targeting them.
          </Typography>
        </Paper>

        <Grid container spacing={4} mt={4}>
          {actionCards.map((card, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  backgroundColor: '#1c2a38',
                  color: 'white',
                  borderRadius: 3,
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 2,
                  boxShadow: '0 0 30px rgba(0,230,255,0.15)',
                }}
              >
                <Stack spacing={2}>
                  {card.icon}
                  <Typography variant="h6" fontWeight={600}>{card.title}</Typography>
                  <Typography variant="body2" color="#cfd8dc">{card.description}</Typography>
                </Stack>
                <Box mt={2}>
                  <Button variant="contained" size="small" sx={{ backgroundColor: '#00e6ff', color: '#000', fontWeight: 'bold' }} onClick={card.onClick}>
                    {card.action}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactsManager;
