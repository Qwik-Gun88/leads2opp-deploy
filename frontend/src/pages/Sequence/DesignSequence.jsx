import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactFlowProvider } from 'reactflow';
import SequenceCanvas from './SequenceCanvas';
import { useLocation } from 'react-router-dom';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const DesignSequence = () => {
  const location = useLocation();
  const userIntent = location.state?.userIntent || '';

  useEffect(() => {
    const generateSequence = async () => {
      if (!userIntent) return;

      try {
        const res = await fetch('/api/generate-sequence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userIntent }),
        });
        const data = await res.json();
        console.log('🧠 AI-generated sequence:', data);
        // TODO: setNodes(data.nodes); setEdges(data.edges);
      } catch (err) {
        console.error('❌ Error generating sequence:', err);
      }
    };

    generateSequence();
  }, [userIntent]);

  return (
    <ThemeProvider theme={darkTheme}>
      <ReactFlowProvider>
        <SequenceCanvas userIntent={userIntent} />
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default DesignSequence;
