import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Paper,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SignatureEditorPanel = () => {
  const [signatureName, setSignatureName] = useState('');
  const [signatureHtml, setSignatureHtml] = useState('');
  const [savedSignatures, setSavedSignatures] = useState([]);
  const [defaultSignatureName, setDefaultSignatureName] = useState('');

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    const res = await fetch('/api/signatures/signatures');
    const data = await res.json();
    setSavedSignatures(data);
    const defaultSig = data.find((sig) => sig.isDefault);
    if (defaultSig) setDefaultSignatureName(defaultSig.name);
  };

  const handleSave = async () => {
    if (!signatureName.trim()) return alert('Enter a signature name');
    const res = await fetch('/api/signatures/save-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: signatureName,
        html: signatureHtml,
        isDefault: signatureName === defaultSignatureName,
      }),
    });
    const data = await res.json();
    if (data.message) {
      fetchSignatures();
      alert('✅ Signature saved');
    }
  };

  const handleSetDefault = async (name) => {
    const sig = savedSignatures.find((s) => s.name === name);
    if (!sig) return;
    await fetch('/api/signatures/save-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sig, isDefault: true }),
    });
    setDefaultSignatureName(name);
    fetchSignatures();
  };

  const handleDelete = async (name) => {
    await fetch(`/api/templates/delete-signature/${name}`, { method: 'DELETE' });
    fetchSignatures();
  };

  return (
    <Paper sx={{ background: '#111827', p: 4, color: '#fff', borderRadius: 3 }}>
      <Typography variant="h5" fontWeight="bold" color="#38bdf8" mb={2}>
        ✍️ Signature Editor
      </Typography>

      <TextField
        label="Signature Name"
        fullWidth
        value={signatureName}
        onChange={(e) => setSignatureName(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{ sx: { backgroundColor: '#1f2937', color: '#fff' } }}
        InputLabelProps={{ sx: { color: '#94a3b8' } }}
      />

      <ReactQuill
        value={signatureHtml}
        onChange={setSignatureHtml}
        theme="snow"
        style={{ background: '#fff', color: '#000', borderRadius: 8, marginBottom: 16 }}
        placeholder="Write your signature..."
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
  <Button variant="contained" sx={{ background: '#4f46e5' }} onClick={handleSave}>
    💾 Save Signature
  </Button>

  <Button
    variant="outlined"
    sx={{ borderColor: '#38bdf8', color: '#38bdf8' }}
    onClick={() => {
      // Placeholder AI logic – you can later connect this to a real API
      const aiSignature = `
        <div style="font-family: Arial, sans-serif;">
          <p>Best regards,</p>
          <p><strong>Fiyaz Totad</strong><br/>
          Account Executive<br/>
          <a href="https://leads2opp.com" style="color: #38bdf8;">leads2opp.com</a></p>
        </div>
      `;
      setSignatureHtml(aiSignature);
    }}
  >
    🤖 Generate with AI
  </Button>
</Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" sx={{ background: '#4f46e5' }} onClick={handleSave}>
          💾 Save Signature
        </Button>
      </Box>

      <Divider sx={{ mb: 2, borderColor: '#374151' }} />

      <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
        🗂️ Saved Signatures
      </Typography>

      {savedSignatures.map((sig) => (
        <Box key={sig.name} sx={{ mb: 3, border: '1px solid #374151', borderRadius: 2, p: 2 }}>
          <Typography fontWeight="bold" color="#38bdf8">
            {sig.name} {sig.name === defaultSignatureName && '⭐ (Default)'}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: sig.html }}
            style={{
              background: '#f8fafc',
              color: '#000',
              padding: 12,
              borderRadius: 6,
              marginTop: 8,
            }}
          />
          <Box mt={1} display="flex" gap={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleSetDefault(sig.name)}
            >
              Set as Default
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleDelete(sig.name)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default SignatureEditorPanel;
