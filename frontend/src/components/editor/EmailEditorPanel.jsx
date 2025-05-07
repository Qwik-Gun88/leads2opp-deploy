import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AIPromptBar from '../assistant/AIPromptBar';

const personalizationTokens = [
  'First Name',
  'Company',
  'Industry',
  'Account Owner',
  'Calendar Link',
  'Email',
];

const personalizeBody = (bodyTemplate, contact) => {
  if (!contact) return bodyTemplate;

  return bodyTemplate
    .replace(/{{First Name}}/g, contact.firstName || '')
    .replace(/{{Last Name}}/g, contact.lastName || '')
    .replace(/{{Company}}/g, contact.company || '')
    .replace(/{{Industry}}/g, contact.industry || '')
    .replace(/{{Account Owner}}/g, contact.accountOwner || '')
    .replace(/{{Calendar Link}}/g, contact.calendarLink || '')
    .replace(/{{Email}}/g, contact.email || '');
};

const EmailEditorPanel = ({ stepName = 'Email 1', onGenerate, onSave }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [signatures, setSignatures] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateAI = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setSubject('AI Generated Subject');
      setBody(data.content);
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const insertToken = (token) => {
    const formattedToken = `{{${token}}}`;
    setBody((prev) => prev + ' ' + formattedToken);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedSignatures')) || [
      { name: 'Default Signature', content: '<p>Best,<br>Fiyaz</p>' }
    ];
    setSignatures(saved);
    setSelectedSignature(saved[0]?.content || '');
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contacts');
        const data = await res.json();
        setContacts(data.contacts || []);
      } catch (err) {
        console.error('Failed to fetch contacts:', err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <Box sx={{ background: '#111827', p: 4, borderRadius: 2, color: '#e0f2fe' }}>
      <Typography variant="h6" gutterBottom>
        ✉️ Editing: {stepName}
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ color: '#94a3b8' }}>Select Contact</InputLabel>
        <Select
          value={selectedContact || ''}
          onChange={(e) => setSelectedContact(e.target.value)}
          sx={{
            color: '#e0f2fe',
            background: '#1f2937',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
            '& svg': { color: '#e0f2fe' }
          }}
        >
          {contacts.map((contact, index) => (
            <MenuItem key={index} value={contact.email}>
              {contact.firstName} {contact.lastName} - {contact.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Subject"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{ sx: { color: '#e0f2fe', background: '#1f2937' } }}
        InputLabelProps={{ sx: { color: '#94a3b8' } }}
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
        InputProps={{ sx: { color: '#e0f2fe', background: '#1f2937' } }}
        InputLabelProps={{ sx: { color: '#94a3b8' } }}
      />

      <Typography variant="body2" color="#94a3b8" sx={{ mb: 1 }}>
        📌 Insert Tokens:
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

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ color: '#94a3b8' }}>Select Signature</InputLabel>
        <Select
          value={selectedSignature}
          onChange={(e) => setSelectedSignature(e.target.value)}
          label="Select Signature"
          sx={{
            color: '#e0f2fe',
            background: '#1f2937',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
            '& svg': { color: '#e0f2fe' }
          }}
        >
          {signatures.map((sig, index) => (
            <MenuItem key={index} value={sig.content}>
              {sig.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() =>
            onSave({
              subject,
              body: personalizeBody(body, contacts.find((c) => c.email === selectedContact)) + '<br/><br/>' + selectedSignature,
              to: contacts.find((c) => c.email === selectedContact)
            })
          }
          sx={{ borderColor: '#4f46e5', color: '#c7d2fe' }}
        >
          💾 Save Email
        </Button>

        <Button
          variant="contained"
          onClick={async () => {
            try {
              const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: 'test@example.com',
                  subject,
                  body: personalizeBody(body, contacts.find((c) => c.email === selectedContact)) + '<br/><br/>' + selectedSignature,
                }),
              });
              const data = await res.json();
              alert(data.message || data.error);
            } catch (err) {
              alert('❌ Failed to send email');
            }
          }}
          sx={{ background: '#10b981' }}
        >
          ✉️ Send Email
        </Button>

        <Button
          variant="outlined"
          onClick={() => alert('💾 Template saved (mock)')}
          sx={{ borderColor: '#10b981', color: '#d1fae5' }}
        >
          💾 Save Template
        </Button>
      </Box>

      <Divider sx={{ my: 4, borderColor: '#334155' }} />

      <Typography variant="h6" sx={{ mb: 2, color: '#94a3b8' }}>
        👀 Preview
      </Typography>

      <Box
        sx={{
          background: '#1f2937',
          borderRadius: 2,
          p: 3,
          whiteSpace: 'pre-wrap',
          color: '#e0f2fe',
          fontFamily: 'monospace',
        }}
      >
        {personalizeBody(body, contacts.find((c) => c.email === selectedContact))}
      </Box>

      <AIPromptBar onSubmit={handleGenerateAI} isLoading={loading} />
    </Box>
  );
};

export default EmailEditorPanel;
