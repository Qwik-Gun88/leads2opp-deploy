import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactFlowProvider } from 'reactflow';
import SequenceCanvas from './SequenceCanvas';
const darkTheme = createTheme({ palette: { mode: 'dark' } });

const DesignSequence = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ReactFlowProvider>
        <SequenceCanvas />
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default DesignSequence;
