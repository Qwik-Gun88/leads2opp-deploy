import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Handle, Position } from 'reactflow';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const EmailNode = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        background: '#121212',
        color: '#fff',
        border: selected ? '2px solid #00e676' : '2px solid #1976d2',
        boxShadow: selected ? '0 0 12px #00e676' : 'none',
        borderRadius: 2,
        padding: 1,
        minWidth: 140,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&:hover': {
          boxShadow: selected
            ? '0 0 16px #00e676'
            : '0 0 6px #1976d2',
        },
        transition: 'box-shadow 0.2s ease, border 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>{data.label}</div>
      {data.scheduledAt && (
        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
          {data.scheduledAt}
        </div>
      )}

      {/* ⚡ Show only if triggerable */}
      {hovered && data.onTrigger && data.label?.toLowerCase().includes('email') && (
        <IconButton
          size="small"
          onClick={data.onTrigger}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: '#fdd835',
            padding: 0.5,
          }}
        >
          <FlashOnIcon fontSize="small" />
        </IconButton>
      )}

      {/* 🔌 Connection handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </Box>
  );
};

export default EmailNode;
