import React from 'react';
import { Box } from '@mui/material';
import { Handle, Position } from 'reactflow';

const CallNode = ({ data, selected }) => {
  return (
    <Box
      sx={{
        background: '#0a192f',
        color: '#fff',
        border: selected ? '2px solid #10b981' : '2px solid #065f46',
        boxShadow: selected ? '0 0 12px #10b981' : 'none',
        borderRadius: 2,
        padding: 1,
        minWidth: 140,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div>{data.label}</div>
      {data.scheduledAt && (
        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{data.scheduledAt}</div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </Box>
  );
};

export default CallNode;
