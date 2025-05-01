// DesignSequence.jsx — Trigger + Main Flow with Continuation
import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  ThemeProvider,
  createTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import EmailNode from './components/nodes/EmailNode';
import TriggerConditionModal from './components/modals/TriggerConditionModal';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const nodeSpacingY = 150;
const triggerOffsetX = 300;

const DesignSequence = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [firstNodeModalOpen, setFirstNodeModalOpen] = useState(true);
  const [showDelayDialog, setShowDelayDialog] = useState(false);
  const [delayOption, setDelayOption] = useState('immediate');
  const [customDate, setCustomDate] = useState(new Date());
  const [customTime, setCustomTime] = useState(new Date().setHours(9, 0, 0, 0));
  const [nextNodeType, setNextNodeType] = useState('email');
  const [initialNodeType, setInitialNodeType] = useState(null);
  const [nodeCounts, setNodeCounts] = useState({ email: 0, call: 0, text: 0 });
  const [lastMainNodeId, setLastMainNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [triggerNode, setTriggerNode] = useState(null);
  const [showTriggerModal, setShowTriggerModal] = useState(false);
  const [showStepTypeModal, setStepTypeModalOpen] = useState(false);
  const [pendingTriggerMeta, setPendingTriggerMeta] = useState({});
  const [openedCount, setOpenedCount] = useState(2);
  const [clickedCount, setClickedCount] = useState(1);

  const nodeTypes = useMemo(() => ({
    emailNode: EmailNode,
    callNode: EmailNode,
    textNode: EmailNode,
  }), []);

  const formatScheduledTime = () => {
    if (delayOption === 'immediate') {
      if (nodes.length === 0 && initialNodeType) return 'Start now';
      return 'Next working day at 9:00 AM';
    }
    const date = new Date(customDate);
    const time = new Date(customTime);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    return date.toLocaleString();
  };

  const getNextNodeLabel = (type) => {
    const count = nodeCounts[type] + 1;
    return `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`;
  };

  const handleAddNodeClick = (type) => {
    setNextNodeType(type);
    setDelayOption('immediate');
    setCustomDate(new Date());
    setCustomTime(new Date().setHours(9, 0, 0, 0));
    setShowDelayDialog(true);
  };

  const handleDelayConfirm = () => {
    const newId = (nodes.length + 1).toString();

    if (nodes.length === 0 && initialNodeType) {
      const node = {
        id: newId,
        type: `${initialNodeType}Node`,
        position: { x: 400, y: 50 },
        data: {
          label: getNextNodeLabel(initialNodeType),
          scheduledAt: formatScheduledTime(),
          onTrigger: () => handleTriggerClick(node),
        },
      };
      setNodes([node]);
      setLastMainNodeId(newId);
      setNodeCounts((prev) => ({ ...prev, [initialNodeType]: prev[initialNodeType] + 1 }));
      setInitialNodeType(null);
      setFirstNodeModalOpen(false);
      setShowDelayDialog(false);
      return;
    }

    const sourceId = selectedNodeId || lastMainNodeId;
    const selected = nodes.find((n) => n.id === sourceId);

    const newNode = {
      id: newId,
      type: `${nextNodeType}Node`,
      data: {
        label: getNextNodeLabel(nextNodeType),
        scheduledAt: formatScheduledTime(),
        onTrigger: () => handleTriggerClick(newNode),
      },
      position: {
        x: selected.position.x,
        y: selected.position.y + nodeSpacingY,
      },
    };

    const newEdge = {
      id: `e${selected.id}-${newId}`,
      source: selected.id,
      target: newId,
      type: 'straight',
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setLastMainNodeId(selectedNodeId ? lastMainNodeId : newId);
    setNodeCounts((prev) => ({ ...prev, [nextNodeType]: prev[nextNodeType] + 1 }));
    setShowDelayDialog(false);
    setSelectedNodeId(null);
  };

  const handleTriggerClick = (node) => {
    setTriggerNode(node);
    setOpenedCount(2);
    setClickedCount(1);
    setShowTriggerModal(true);
  };

  const handleTriggerConfirm = () => {
    const condition = `Opened ${openedCount}x, Clicked ${clickedCount}x`;
    setPendingTriggerMeta({ condition });
    setShowTriggerModal(false);
    setStepTypeModalOpen(true);
  };

  const handleStepTypeConfirm = (type) => {
    const newId = (nodes.length + 1).toString();
    const triggerX = triggerNode.position.x + triggerOffsetX;
    const triggerY = triggerNode.position.y + nodeSpacingY;

    const newNode = {
      id: newId,
      type: `${type}Node`,
      data: {
        label: getNextNodeLabel(type),
        scheduledAt: formatScheduledTime(),
        isTrigger: true,
        ...pendingTriggerMeta,
        onTrigger: () => handleTriggerClick(newNode),
      },
      position: { x: triggerX, y: triggerY },
    };

    const newEdge = {
      id: `et${triggerNode.id}-${newId}`,
      source: triggerNode.id,
      target: newId,
      sourceHandle: 'right',
      targetHandle: 'top',
      type: 'straight',
      animated: true,
      label: pendingTriggerMeta.condition,
      style: { stroke: '#f9a825', strokeDasharray: '5,5' },
      labelBgStyle: { fill: '#888', color: '#fff', fontSize: 12 },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setNodeCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setStepTypeModalOpen(false);
    setSelectedNodeId(newId);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ReactFlowProvider>
        <Box sx={{ height: '100vh', width: '100%' }}>
          {nodes.length > 0 && (
            <Box sx={{ p: 2, display: 'flex', gap: 2, backgroundColor: '#1a1a1a', borderBottom: '1px solid #333', boxShadow: '0 2px 4px rgba(0,0,0,0.5)', zIndex: 10 }}>
              <Button onClick={() => handleAddNodeClick('email')} variant="contained">Add Email</Button>
              <Button onClick={() => handleAddNodeClick('call')} variant="contained" color="success">Add Call</Button>
              <Button onClick={() => handleAddNodeClick('text')} variant="contained" color="warning">Add Text</Button>
            </Box>
          )}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
            onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
            onNodeClick={(_, node) => setSelectedNodeId(node.id)}
            defaultViewport={{ x: 0, y: 100, zoom: 0.85 }}
            style={{ backgroundColor: '#0e0e0e' }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>

          <Dialog open={firstNodeModalOpen}>
            <DialogTitle>Select your first contact step</DialogTitle>
            <DialogContent sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button variant="contained" onClick={() => { setInitialNodeType('email'); setShowDelayDialog(true); }}>Start with Email</Button>
              <Button variant="contained" color="success" onClick={() => { setInitialNodeType('call'); setShowDelayDialog(true); }}>Start with Call</Button>
              <Button variant="contained" color="warning" onClick={() => { setInitialNodeType('text'); setShowDelayDialog(true); }}>Start with Text</Button>
            </DialogContent>
          </Dialog>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog open={showDelayDialog} onClose={() => setShowDelayDialog(false)}>
              <DialogTitle>When should this step occur?</DialogTitle>
              <DialogContent>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <RadioGroup value={delayOption} onChange={(e) => setDelayOption(e.target.value)}>
                    <FormControlLabel value="immediate" control={<Radio />} label="Immediately after previous (Next working day)" />
                    <FormControlLabel value="custom" control={<Radio />} label="Choose date & time" />
                  </RadioGroup>
                </FormControl>
                {delayOption === 'custom' && (
                  <>
                    <DatePicker label="Select date" value={customDate} onChange={setCustomDate} sx={{ mb: 2 }} />
                    <TimePicker label="Select time" value={customTime} onChange={setCustomTime} />
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDelayDialog(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleDelayConfirm}>Add Step</Button>
              </DialogActions>
            </Dialog>
          </LocalizationProvider>

          <Dialog open={showStepTypeModal} onClose={() => setStepTypeModalOpen(false)}>
            <DialogTitle>Select step type for trigger</DialogTitle>
            <DialogContent sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button variant="contained" onClick={() => handleStepTypeConfirm('email')}>Email</Button>
              <Button variant="contained" color="success" onClick={() => handleStepTypeConfirm('call')}>Call</Button>
              <Button variant="contained" color="warning" onClick={() => handleStepTypeConfirm('text')}>Text</Button>
            </DialogContent>
          </Dialog>

          <TriggerConditionModal
            open={showTriggerModal}
            onClose={() => setShowTriggerModal(false)}
            onSubmit={handleTriggerConfirm}
            openedCount={openedCount}
            clickedCount={clickedCount}
            setOpenedCount={setOpenedCount}
            setClickedCount={setClickedCount}
          />
        </Box>
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default DesignSequence;
