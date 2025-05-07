import React from 'react';
import { Button } from '@mui/material';

const DocumentUploader = ({ onUpload }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/parse-document', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.content) {
        onUpload(data.content); // Send extracted text to parent
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <Button variant="outlined" component="label" sx={{ mt: 2 }}>
      📄 Upload Notes or Brief
      <input type="file" hidden onChange={handleFileChange} />
    </Button>
  );
};

export default DocumentUploader;
