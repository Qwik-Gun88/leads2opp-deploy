import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Typography, Button, Divider,
  Chip, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import AIPromptBar from '../assistant/AIPromptBar'; // Adjust path if needed

const callTokens = [
  'First Name', 'Company', 'Pain Point', 'Product Pitch', 'Objection Handling', 'Next Steps',
];

const personalizeBody = (text, contact) => {
  if (!contact) return text;
  let result = text;
  Object.keys(contact).forEach((key) => {
    const token = `{{${key.replace(/([A-Z])/g, ' $1').trim()}}}`;
    const value = contact[key];
    result = result.replaceAll(token, value || '');
  });
  return result;
};

const CallEditorPanel = ({ stepName = 'Call 1', onSave }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [script, setScript] = useState('');

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
    setScript((prev) => prev + ' ' + formattedToken);
  };

  const handleGenerateAI = async (prompt) => {
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setScript(data.content);
    } catch (error) {
      console.error('AI generation error:', error);
    }
  };

  return (
    <Box sx={{ background: '#111827', p: 4, borderRadius: 2, color: '#fff' }}>
      <Typography variant="h6" gutterBottom>📞 Editing: {stepName}</Typography>

      {/* Contact Selector */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ color: '#94a3b8' }}>Select Contact</InputLabel>
        <Select
          value={selectedContact || ''}
          onChange={(e) => setSelectedContact(e.target.value)}
          sx={{
            color: '#e0f2fe',
            background: '#1f2937',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
            '& svg': { color: '#e0f2fe' },
          }}
        >
          {contacts.map((contact, index) => (
            <MenuItem key={index} value={contact.email}>
              {contact.firstName} {contact.lastName} – {contact.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Script Input */}
      <TextField
        fullWidth
        label="Call Script"
        variant="outlined"
        multiline
        rows={12}
        value={script}
        onChange={(e) => setScript(e.target.value)}
        sx={{ mb: 3 }}
        InputLabelProps={{ sx: { color: '#cbd5e1' } }}
        InputProps={{ sx: { color: '#fff', background: '#1f2937' } }}
      />

      {/* AIPromptBar */}
      <AIPromptBar onSubmit={handleGenerateAI} />

      {/* Tokens */}
      <Typography variant="body2" color="gray" sx={{ mb: 1 }}>🔖 Insert Tokens:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {callTokens.map((token) => (
          <Chip
            key={token}
            label={token}
            onClick={() => insertToken(token)}
            sx={{ background: '#334155', color: '#fff', cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2, borderColor: '#374151' }} />

      {/* Save Button */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => onSave({
            script: personalizeBody(script, contacts.find((c) => c.email === selectedContact)),
            to: selectedContact
          })}
          sx={{ borderColor: '#4f46e5', color: '#c7d2fe' }}
        >
          💾 Save Call
        </Button>
      </Box>
    </Box>
  );
};

export default CallEditorPanel;
