import React, { useState, useMemo, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Snackbar,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import EmailNode from '../../components/nodes/EmailNode';
import TriggerConditionModal from '../../components/modals/TriggerConditionModal';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import EmailEditorPanel from '../../components/editor/EmailEditorPanel';
import CallEditorPanel from '../../components/editor/CallEditorPanel';
import TextEditorPanel from '../../components/editor/TextEditorPanel';
import { useLocation } from 'react-router-dom';






const nodeSpacingY = 150;
const triggerOffsetX = 300;

const SequenceCanvas = () => {
  const { setViewport } = useReactFlow();
  const navigate = useNavigate();
  const location = useLocation();
const fromPage = location.state?.from || 'dashboard'; // fallback to dashboard if nothing passed


  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeCounts, setNodeCounts] = useState({ email: 0, call: 0, text: 0 });
  const [lastMainNodeId, setLastMainNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const [showDelayDialog, setShowDelayDialog] = useState(false);
  const [showStepTypeModal, setStepTypeModalOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [initialNodeType, setInitialNodeType] = useState(null);
  const [nextNodeType, setNextNodeType] = useState('email');
  const [sequenceName, setSequenceName] = useState('');
  const [designStarted, setDesignStarted] = useState(false);

  const [delayOption, setDelayOption] = useState('immediate');
  const [customDate, setCustomDate] = useState(new Date());
  const [customTime, setCustomTime] = useState(new Date().setHours(9, 0, 0, 0));

  const [triggerNode, setTriggerNode] = useState(null);
  const [pendingTriggerMeta, setPendingTriggerMeta] = useState({});
  const [openedCount, setOpenedCount] = useState(2);
  const [clickedCount, setClickedCount] = useState(1);
  const [showTriggerModal, setShowTriggerModal] = useState(false);
  const [sequenceNameDisplay, setSequenceNameDisplay] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);






  useEffect(() => {
    const saved = localStorage.getItem('lastSequence');
    if (saved) {
      const parsed = JSON.parse(saved);
      setNodes(parsed.nodes || []);
      setEdges(parsed.edges || []);
      setSequenceNameDisplay(parsed.name || 'Unnamed Sequence');
      setDesignStarted(true);
      localStorage.removeItem('lastSequence');
    }
  }, []);

  const nodeTypes = useMemo(() => ({
    emailNode: EmailNode,
    callNode: EmailNode,
    textNode: EmailNode,
  }), []);

  const renumberNodes = (nodes) => {
    const counts = { email: 0, call: 0, text: 0 };
    const sorted = [...nodes].sort((a, b) => a.position.y - b.position.y);

    return sorted.map((node) => {
      const type = node.type.replace('Node', '');
      if (!counts.hasOwnProperty(type)) return node;
      counts[type]++;
      return {
        ...node,
        data: {
          ...node.data,
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${counts[type]}`,
        },
      };
    });
  };

  const formatScheduledTime = () => {
    if (delayOption === 'immediate') {
      return nodes.length === 0 ? 'Start now' : 'Next working day at 9:00 AM';
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
    setDesignStarted(true);
  };

  const handleDelayConfirm = () => {
    const newId = (nodes.length + 1).toString();

    if (nodes.length === 0) {
      const type =  nextNodeType;
      const node = {
        id: newId,
        type: `${type}Node`,
        position: { x: 400, y: 50 },
        data: {
          label: getNextNodeLabel(type),
          scheduledAt: formatScheduledTime(),
          onTrigger: () => handleTriggerClick(node),
        },
      };

      setNodes([node]);
      setLastMainNodeId(newId);
      setNodeCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
      setInitialNodeType(null);
      setShowDelayDialog(false);
      setDesignStarted(true);
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
      position: selected
        ? { x: selected.position.x, y: selected.position.y + nodeSpacingY }
        : { x: 400, y: 50 },
    };

    const newEdge = selected
      ? {
          id: `e${selected.id}-${newId}`,
          source: selected.id,
          target: newId,
          type: 'straight',
        }
      : null;

    setNodes((nds) => [...nds, newNode]);
    if (newEdge) setEdges((eds) => [...eds, newEdge]);
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

    let newNode = {
      id: newId,
      type: `${type}Node`,
      data: {
        label: getNextNodeLabel(type),
        scheduledAt: formatScheduledTime(),
        isTrigger: true,
        ...pendingTriggerMeta,
      },
      position: { x: triggerX, y: triggerY },
    };

    newNode.data.onTrigger = () => handleTriggerClick(newNode);

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

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setNodeCounts({ email: 0, call: 0, text: 0 });
    setLastMainNodeId(null);
    setViewport({ x: 0, y: 100, zoom: 0.85 });
    setInitialNodeType(null);
    setFirstNodeModalOpen(true);
  };

  return (
    <Box sx={{ pt: '64px', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
    {/* Top App Bar */}
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        zIndex: 1000,
      }}
    >
      {/* Left: Add Buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" color="info" onClick={() => handleAddNodeClick('email')}>Add Email</Button>
        <Button variant="contained" color="success" onClick={() => handleAddNodeClick('call')}>Add Call</Button>
        <Button variant="contained" color="warning" onClick={() => handleAddNodeClick('text')}>Add Text</Button>
      </Box>
  
      {/* Center: Editable Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {editingName ? (
          <TextField
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: '#1f2937',
              input: { color: '#fff' },
              '& fieldset': { borderColor: '#555' },
              width: '200px'
            }}
            onBlur={() => setEditingName(false)}
            autoFocus
          />
        ) : (
          <>
            <Typography variant="h6" sx={{ color: '#60a5fa', fontWeight: 600 }}>
              {sequenceName || 'Untitled Sequence'}
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => setEditingName(true)}
              sx={{ minWidth: 0, color: '#60a5fa', textTransform: 'none' }}
            >
              ✏️
            </Button>
          </>
        )}
      </Box>
  
      {/* Right: Actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
  variant="outlined"
  onClick={() => navigate(fromPage === 'contacts-centre' ? '/contacts-centre' : '/dashboard')}
  sx={{
    color: '#38bdf8',
    borderColor: '#38bdf8',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#13232f',
    },
  }}
>
  ⬅ Return to {fromPage === 'contacts-centre' ? 'Contacts Centre' : 'Dashboard'}
</Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>🔄 Reset</Button>
        <Button variant="contained" color="primary" onClick={() => setSaveDialogOpen(true)}>💾 Save Sequence</Button>
        <Button variant="outlined" onClick={() => navigate('/updates')}>📂 View Sequences</Button>
      </Box>
    </Box>

      {/* Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) => {
          const updated = applyNodeChanges(changes, nodes);
          const renumbered = renumberNodes(updated);
          setNodes(renumbered);
        }}
        onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
        onNodeClick={(_, node) => {
            setSelectedNodeId(node.id);     // Keep if needed elsewhere
            setSelectedNodeData(node);      // Use this for rendering panel
          }}
          
        defaultViewport={{ x: 0, y: 100, zoom: 0.85 }}
        style={{ backgroundColor: '#0e0e0e', flexGrow: 1 }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      {selectedNodeData && (
  <Box
    sx={{
      position: 'absolute',
      right: 0,
      top: 64,
      bottom: 0,
      width: '380px',
      backgroundColor: '#0f172a',
      borderLeft: '1px solid #334155',
      boxShadow: '-2px 0 6px rgba(0,0,0,0.4)',
      zIndex: 20,
    }}
  >
    {selectedNodeData?.type === 'emailNode' && (
      <EmailEditorPanel
        stepName={selectedNodeData.data?.label}
        onGenerate={({ subject, body }) => {
          console.log('✨ AI Generate clicked:', { subject, body });
        }}
        onSave={({ subject, body }) => {
          console.log('💾 Saved email content for:', selectedNodeData.id, { subject, body });
        }}
      />
    )}

    {selectedNodeData?.type === 'callNode' && (
      <CallEditorPanel
        stepName={selectedNodeData.data?.label}
        onGenerate={() => {}}
        onSave={() => {}}
      />
    )}

    {selectedNodeData?.type === 'textNode' && (
      <TextEditorPanel
        stepName={selectedNodeData.data?.label}
        onGenerate={() => {}}
        onSave={() => {}}
      />
    )}
  </Box>
)}


      {/* Dialogs and Modals */}
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

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Name your sequence</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Sequence Name"
            variant="outlined"
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              const name = sequenceName.trim() || `Sequence ${new Date().toLocaleDateString()}`;
              const newSequence = {
                name,
                nodes,
                edges,
                createdAt: new Date().toLocaleString(),
              };
              const existing = JSON.parse(localStorage.getItem('savedSequences') || '[]');
              const lastSaved = JSON.parse(localStorage.getItem('lastSequence'));
              const updatedSequences = lastSaved
                ? existing.map((seq) =>
                    seq.createdAt === lastSaved.createdAt ? newSequence : seq
                  )
                : [...existing, newSequence];

              localStorage.setItem('savedSequences', JSON.stringify(updatedSequences));
              setSaveDialogOpen(false);
              setSequenceName('');
              setShowSnackbar(true);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="✅ Sequence saved!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{ sx: { background: '#1e293b', color: '#00e676', fontWeight: 'bold' } }}
      />

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
  );
};

export default SequenceCanvas;
