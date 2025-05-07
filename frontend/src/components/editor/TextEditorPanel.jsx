import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const personalizeText = (template, contact) => {
  if (!contact) return template;
  return template
    .replace(/{{First Name}}/g, contact.firstName || '')
    .replace(/{{Last Name}}/g, contact.lastName || '')
    .replace(/{{Company}}/g, contact.company || '')
    .replace(/{{Industry}}/g, contact.industry || '')
    .replace(/{{Account Owner}}/g, contact.accountOwner || '')
    .replace(/{{Calendar Link}}/g, contact.calendarLink || '')
    .replace(/{{Email}}/g, contact.email || '');
};

const TextEditorPanel = ({ stepName = 'Text 1', onSave }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [message, setMessage] = useState('');
  const [showPromptBar, setShowPromptBar] = useState(false);

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

  const insertToken = (token) => {
    const formattedToken = `{{${token}}}`;
    setMessage((prev) => prev + ' ' + formattedToken);
  };

  const handleGenerateAI = async (prompt) => {
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMessage(data.content);
    } catch (err) {
      console.error('AI generation error:', err);
    }
  };

  return (
    <Box sx={{ background: '#111827', p: 4, borderRadius: 2, color: '#fff' }}>
      <Typography variant="h6" gutterBottom>
        📱 Editing: {stepName}
      </Typography>

      {/* Contact Selector */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ color: '#94a3b8' }}>Select Contact</InputLabel>
        <Select
          value={selectedContact}
          onChange={(e) => setSelectedContact(e.target.value)}
          sx={{
            color: '#e0f2fe',
            background: '#1f2937',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
            '& svg': { color: '#e0f2fe' },
          }}
        >
          {contacts.map((contact, idx) => (
            <MenuItem key={idx} value={contact.email}>
              {contact.firstName} {contact.lastName} - {contact.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Message Body */}
      <TextField
        fullWidth
        label="Text Message"
        multiline
        rows={8}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 3 }}
        InputLabelProps={{ sx: { color: '#cbd5e1' } }}
        InputProps={{ sx: { color: '#fff', background: '#1f2937' } }}
      />

      {/* Token Buttons */}
      <Typography variant="body2" color="gray" sx={{ mb: 1 }}>
        🔖 Insert Tokens:
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

      <Divider sx={{ my: 2, borderColor: '#374151' }} />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => setShowPromptBar(true)}
          sx={{ background: '#4f46e5' }}
        >
          ⚡ Generate with AI
        </Button>

        <Button
          variant="outlined"
          onClick={() =>
            onSave({
              message: personalizeText(
                message,
                contacts.find((c) => c.email === selectedContact)
              ),
              to: selectedContact,
            })
          }
          sx={{ borderColor: '#4f46e5', color: '#c7d2fe' }}
        >
          💾 Save Text
        </Button>
      </Box>

      {/* Prompt Bar */}
      {showPromptBar && (
        <AIPromptBar
          onSubmit={handleGenerateAI}
          onClose={() => setShowPromptBar(false)}
        />
      )}
    </Box>
  );
};

export default TextEditorPanel;
