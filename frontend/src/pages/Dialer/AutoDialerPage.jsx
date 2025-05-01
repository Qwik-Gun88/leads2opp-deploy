import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const formatCallDuration = (startTime) => {
    if (!startTime) return '0s';
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins > 0 ? `${mins}m ` : ''}${secs}s`;
  };
  

// Mock AI Recommendations
const getAIInsights = (contact) => {
    const tips = [
      `Mention GCP migration benefits.`,
      `Ask how ${contact.company} manages cost optimization.`,
      `Introduce Gemini AI for productivity.`,
      `Bring up a recent LinkedIn post from ${contact.name}.`,
      `Highlight a customer story in ${contact.city}.`,
    ];
    return tips.slice(0, 2); // Randomize if needed
  };
  
const getFakeTranscript = (contact) => {
    const lines = [
      `Hi, this is ${contact.name} from ${contact.company}.`,
      `We're currently reviewing AI adoption strategies.`,
      `Can you share how Gemini or Vertex could support us?`,
      `We're exploring moving workloads to GCP this quarter.`,
      `That sounds great, send us more details!`,
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  };
  
const getStatusColor = (status) => {
    switch (status) {
      case 'calling': return '#00e676';
      case 'connected': return '#38bdf8';
      case 'skipped': return '#facc15';
      case 'completed': return '#a5f3fc';
      default: return '#607d8b';
    }
  };
  
const AutoDialerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedContacts } = location.state || { selectedContacts: [] };
  

  const [callStates, setCallStates] = useState(
    selectedContacts.map((c) => ({
      ...c,
      status: 'pending',
      note: '',
      transcript: '',
      startTime: null,
    }))
  );

  // Simulate parallel dialing
  useEffect(() => {
    const updatedStates = callStates.map((c) => ({
      ...c,
      status: 'calling',
      startTime: Date.now(),
    }));
    setCallStates(updatedStates);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCallStates((prev) =>
        prev.map((c) =>
          c.status === 'calling'
            ? {
                ...c,
                transcript: (c.transcript || '') + '\n' + getFakeTranscript(c),
              }
            : c
        )
      );
    }, 4000); // Every 4 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0b0f19', color: 'white' }}>
      {/* Sidebar - Contact list with live statuses */}
      <Box sx={{ width: 300, borderRight: '1px solid #1e2a38', backgroundColor: '#101926', p: 2 }}>
        <Typography variant="h6" mb={2}>📞 Calling {callStates.length} Contacts</Typography>
        {callStates.map((contact, idx) => (
          <Paper key={idx} sx={{ p: 1.5, mb: 1, backgroundColor: '#1c2a38', borderLeft: `4px solid ${getStatusColor(contact.status)}` }}>
            <Typography variant="subtitle2">{contact.name}</Typography>
            <Typography variant="caption" sx={{ color: '#90caf9' }}>{contact.status.toUpperCase()}</Typography>
          </Paper>
        ))}
        <Divider sx={{ my: 2, borderColor: '#263238' }} />
        <Button onClick={() => navigate(-1)} variant="outlined" sx={{ color: '#00e6ff', borderColor: '#00e6ff' }}>
          ⬅ Back to Contacts
        </Button>
      </Box>

      {/* Main call screen and AI panels will go here */}
      {/* Main Call Panel */}
      <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h4" fontWeight={600} mb={3}>
          ☎️ Live Calls
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 4 }}>
        {callStates.map((contact, idx) => (
            <Paper
            key={idx}
            elevation={4}
            sx={{
              p: 3,
              backgroundColor: '#1c2a38',
              borderRadius: 3,
              boxShadow: `0 0 16px ${getStatusColor(contact.status)}88`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Contact Info */}
            <Box mb={2}>
              <Typography variant="h6" color="#00e6ff" fontWeight={600}>
                {contact.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                {contact.title} @ {contact.company}
              </Typography>
              <Typography variant="caption" sx={{ color: '#90caf9' }}>
                {contact.phone} • Duration: {formatCallDuration(contact.startTime)}
              </Typography>
            </Box>
          
            {/* Transcript */}
            <Box mb={2}>
              <Typography variant="caption" fontWeight={600} sx={{ color: '#90caf9' }}>Transcript:</Typography>
              <Box
                sx={{
                  background: 'linear-gradient(145deg, #0e1826, #141f2c)',
                  color: '#e0f7fa',
                  p: 2,
                  mt: 1,
                  borderRadius: 2,
                  fontSize: 13,
                  fontFamily: 'monospace',
                  maxHeight: 100,
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  boxShadow: 'inset 0 0 12px #00e6ff33',
                }}
              >
                {contact.transcript || '...connecting'}
              </Box>
            </Box>
          
            {/* Notes */}
            <Box mb={2}>
              <Typography variant="caption" fontWeight={600} sx={{ color: '#90caf9' }}>Quick Note:</Typography>
              <Box
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newStates = [...callStates];
                  newStates[idx].note = e.currentTarget.innerText;
                  setCallStates(newStates);
                }}
                sx={{
                  backgroundColor: '#0e1826',
                  border: '1px solid #00e6ff',
                  borderRadius: 2,
                  color: '#ffffff',
                  p: 2,
                  mt: 1,
                  fontSize: 13,
                  minHeight: 70,
                  boxShadow: '0 0 8px #00e6ff55',
                  outline: 'none',
                  '&:empty:before': {
                    content: '"Type notes here..."',
                    color: '#5e7f91',
                    fontStyle: 'italic',
                  }
                }}
              >
                {contact.note}
              </Box>
            </Box>
          
            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#00e676', color: '#000', fontWeight: 'bold', flex: 1 }}
                onClick={() => {
                  const updated = [...callStates];
                  updated[idx].status = 'completed';
                  setCallStates(updated);
                }}
              >
                ✅ END CALL
              </Button>
          
              <Button
                variant="outlined"
                size="small"
                sx={{ color: '#ffb74d', borderColor: '#ffb74d', flex: 1 }}
                onClick={() => {
                  const updated = [...callStates];
                  updated[idx].status = 'skipped';
                  setCallStates(updated);
                }}
              >
                ⏭️ SKIP
              </Button>
          
              <Button
                variant="outlined"
                size="small"
                sx={{ color: '#90caf9', borderColor: '#90caf9', flex: 1 }}
                onClick={() => {
                  const headers = ['Name', 'Company', 'Phone', 'Transcript', 'Notes'];
                  const rows = [
                    [contact.name, contact.company, contact.phone, `"${contact.transcript}"`, `"${contact.note}"`]
                  ];
                  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${contact.name.replace(' ', '_')}_call_summary.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                📤 EXPORT
              </Button>
            </Box>
          </Paper>          
          ))}
        </Box>

        <Box mt={4}>
          <Typography variant="h5" mb={2}>💡 AI Recommendations</Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {callStates.slice(0, 2).map((c, i) => (
              <Paper key={i} sx={{ p: 2, backgroundColor: '#13202c', flex: 1 }}>
                <Typography variant="subtitle2" color="#38bdf8">{c.name}</Typography>
                <ul style={{ paddingLeft: 16, marginTop: 8 }}>
                  {getAIInsights(c).map((tip, idx) => (
                    <li key={idx} style={{ fontSize: 13, color: '#90caf9' }}>{tip}</li>
                  ))}
                </ul>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AutoDialerPage;
