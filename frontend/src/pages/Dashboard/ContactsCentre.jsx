import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Checkbox, Drawer, Button, TablePagination, IconButton
} from '@mui/material';
import { Email, Phone, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderAppBar from '../../components/layout/HeaderAppBar';
import EmailEditorPanel from '../../components/editor/EmailEditorPanel';
import CallEditorPanel from '../../components/editor/CallEditorPanel';
import TextEditorPanel from '../../components/editor/TextEditorPanel';


const mockLists = [
  {
    id: 1,
    name: 'April_Enterprise_Leads.csv',
    contactsCount: 3,
    importedBy: 'Fiyaz A.',
    importedAt: '2025-04-12 10:45 AM',
    contacts: [
      { id: 1, name: 'Alice Kim', company: 'TechNova', title: 'CTO', city: 'Toronto', phone: '123-456-7890', email: 'alice@technova.com', history: { lastEmail: '2025-04-20T14:30:00Z', lastCall: '2025-04-22T10:15:00Z', lastText: '2025-04-21T09:00:00Z' } },
      { id: 2, name: 'David Singh', company: 'CloudEdge', title: 'Director', city: 'Vancouver', phone: '234-567-8901', email: 'david@cloudedge.io', history: { lastEmail: '2025-04-18T11:45:00Z', lastCall: '2025-04-21T16:00:00Z', lastText: '2025-04-22T08:00:00Z' } },
      { id: 3, name: 'Riya Patel', company: 'FinSpark', title: 'Manager', city: 'Toronto', phone: '345-678-9012', email: 'riya@finspark.com', history: { lastEmail: '2025-04-19T09:30:00Z', lastCall: '2025-04-20T12:20:00Z', lastText: null } }
    ]
  }
];

const ContactsCentre = () => {
  const [selectedList] = useState(mockLists[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeEditor, setActiveEditor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Contacts Centre | leads2opp';
  }, []);

  const handleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredContacts = selectedList.contacts.filter(contact =>
    Object.values(contact).some(val => typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <HeaderAppBar />
      <Box sx={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(circle at top, #0b0f19, #0e1826)', color: 'white' }}>
      <Box sx={{ width: 280, p: 3, backgroundColor: '#101926', borderRight: '1px solid #1c2a38', boxShadow: '4px 0 12px rgba(0,230,255,0.1)' }}>
          <Typography variant="h6" fontWeight={600} mb={6}>🔎 Smart Insights</Typography>
          <Typography variant="body2" color="#90caf9">
            {selectedIds.length} contact(s) selected
          </Typography>
          {selectedIds.length > 0 && (
            <>
              <Box mt={2}>
                <Typography variant="body2" fontWeight={600} color="#38bdf8">Top Cities:</Typography>
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  {Object.entries(selectedList.contacts.filter(c => selectedIds.includes(c.id)).reduce((acc, c) => {
                    acc[c.city] = (acc[c.city] || 0) + 1;
                    return acc;
                  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([city, count]) => (
                    <li key={city} style={{ color: '#00e6ff', fontSize: 13 }}>{city} — {count}</li>
                  ))}
                </ul>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" fontWeight={600} color="#38bdf8">Top Titles:</Typography>
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  {Object.entries(selectedList.contacts.filter(c => selectedIds.includes(c.id)).reduce((acc, c) => {
                    acc[c.title] = (acc[c.title] || 0) + 1;
                    return acc;
                  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([title, count]) => (
                    <li key={title} style={{ color: '#90caf9', fontSize: 13 }}>{title} — {count}</li>
                  ))}
                </ul>
              </Box>

      {/* Mini Timeline */}
      {selectedIds.length === 1 && (
                <Box mt={3}>
                  <Typography variant="body2" fontWeight={600} color="#38bdf8" gutterBottom>⏳ Contact Timeline</Typography>
                  {(() => {
                    const contact = selectedList.contacts.find(c => c.id === selectedIds[0]);
                    const { history } = contact || {};
                    const formatDate = (date) => {
                      if (!date) return '—';
                      const diff = Math.floor((Date.now() - new Date(date)) / 86400000);
                      return `${diff} day${diff !== 1 ? 's' : ''} ago`;
                    };
                    return (
                      <ul style={{ paddingLeft: 16, margin: 0, listStyle: 'none' }}>
                        <li style={{ fontSize: 13, color: '#90caf9' }}>📧 Email: {formatDate(history?.lastEmail)}</li>
                        <li style={{ fontSize: 13, color: '#90caf9' }}>📞 Call: {formatDate(history?.lastCall)}</li>
                        <li style={{ fontSize: 13, color: '#90caf9' }}>💬 Text: {formatDate(history?.lastText)}</li>
                      </ul>
                    );
                  })()}
                </Box>
              )}
            </>
          )}
        </Box>


        {/* Main Content */}
        <Box sx={{ flex: 1, px: 4, pt: 10, pb: 6 }}>
        <Typography variant="h4" fontWeight={700} mb={4} sx={{ color: '#38bdf8', textShadow: '0 0 10px #00e6ff' }}>📇 Contacts Centre</Typography>

          <Paper sx={{ background: '#1c2a38', p: 2, borderRadius: 2, boxShadow: '0 0 10px #00ffcc33', mb: 3 }}>
            <Typography variant="body1" fontWeight={600} sx={{ color: '#66f2ff' }}>📄 Imported Lists</Typography>
            <Box mt={1} sx={{ border: '1px solid #00e6ff', borderRadius: 2, p: 1.5 }}>
              <Typography variant="body2" color="white">
                {selectedList.name} — {selectedList.contacts.length} contacts • Imported by {selectedList.importedBy} on {selectedList.importedAt}
              </Typography>
            </Box>
          </Paper>

          {/* Search + Action Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              sx={{
                backgroundColor: '#1e2a38',
                borderRadius: 2,
                '& input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#00e6ff' },
                  '&.Mui-focused fieldset': { borderColor: '#00e6ff' },
                }
              }}
            />
            <Button
              variant="outlined"
              sx={{ color: '#00e6ff', borderColor: '#00e6ff', '&:hover': { backgroundColor: '#13232f' } }}
            >
              ⚙️ Filters
            </Button>
            <Button
  variant="contained"
  disabled={selectedIds.length === 0}
  onClick={() => {
    const contactsToCall = selectedList.contacts.filter(c => selectedIds.includes(c.id));
    navigate('/auto-dialer', { state: { selectedContacts: contactsToCall } });
  }}
  sx={{
    backgroundColor: '#00e6ff',
    color: '#000',
    fontWeight: 'bold',
    boxShadow: '0 0 10px #00e6ff88',
    '&.Mui-disabled': {
      backgroundColor: '#1e2a38',
      color: '#5c7288',
      boxShadow: 'none',
      opacity: 0.6,
    },
  }}
>
  📞 Call Selected
</Button>

<Button
  variant="contained"
  disabled={selectedIds.length === 0}
  onClick={() => navigate('/design-sequence', { state: { from: 'contacts-centre' } })}
  sx={{
    backgroundColor: '#38bdf8',
    color: '#000',
    fontWeight: 'bold',
    boxShadow: '0 0 10px #38bdf877',
    '&.Mui-disabled': {
      backgroundColor: '#1e2a38',
      color: '#5c7288',
      boxShadow: 'none',
      opacity: 0.6,
    },
  }}
>
  📋 Assign to Sequence
</Button>


          </Box>
          
          {/* Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#1c2a38', borderRadius: 3 }}>
            <Table>
            <TableHead>
  <TableRow sx={{ backgroundColor: '#243447' }}>
    <TableCell padding="checkbox">
      <Checkbox
        sx={{ color: '#00e676' }}
        checked={selectedIds.length === filteredContacts.length}
        onChange={(e) => {
          const checked = e.target.checked;
          setSelectedIds(checked ? filteredContacts.map(c => c.id) : []);
        }}
      />
    </TableCell>
    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Company</TableCell>
    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Title</TableCell>
    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>City</TableCell>
    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
  </TableRow>
</TableHead>
              <TableBody>
                {filteredContacts.map(contact => (
                  <TableRow
  key={contact.id}
  hover
  sx={{
    '&:hover': {
      backgroundColor: '#283849',
      boxShadow: '0 0 10px #00e6ff55',
      transition: '0.2s',
    }
  }}
>
  <TableCell padding="checkbox">
    <Checkbox
      checked={selectedIds.includes(contact.id)}
      onChange={() => handleSelect(contact.id)}
      sx={{ color: '#00e676' }}
    />
  </TableCell>
  <TableCell sx={{ color: '#ffffff' }}>{contact.name}</TableCell>
  <TableCell sx={{ color: '#ffffff' }}>{contact.company}</TableCell>
  <TableCell sx={{ color: '#ffffff' }}>{contact.title}</TableCell>
  <TableCell sx={{ color: '#ffffff' }}>{contact.city}</TableCell>
  <TableCell>
    <IconButton onClick={() => { setSelectedContact(contact); setActiveEditor('call'); }}>
      <Phone sx={{ color: '#00e676' }} />
    </IconButton>
    <IconButton onClick={() => { setSelectedContact(contact); setActiveEditor('email'); }}>
      <Email sx={{ color: '#38bdf8' }} />
    </IconButton>
    <IconButton onClick={() => { setSelectedContact(contact); setActiveEditor('text'); }}>
      <Info sx={{ color: '#facc15' }} />
    </IconButton>
  </TableCell>
</TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredContacts.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              rowsPerPageOptions={[25, 50, 100]}
              sx={{ color: 'white' }}
            />
          </TableContainer>
        </Box>

        {/* Right Editor Drawer */}
        <Drawer
  anchor="right"
  open={!!activeEditor}
  onClose={() => {
    setActiveEditor(null);
    setSelectedContact(null);
  }}
  PaperProps={{
    sx: {
      backdropFilter: 'blur(10px)',
      background: 'rgba(30, 41, 59, 0.95)',
      color: 'white',
      width: 380,
      p: 3,
      boxShadow: '0 0 20px #38bdf8',
    },
  }}
>
  {activeEditor === 'email' && selectedContact && (
    <EmailEditorPanel contact={selectedContact} />
  )}
  {activeEditor === 'call' && selectedContact && (
    <CallEditorPanel contact={selectedContact} />
  )}
  {activeEditor === 'text' && selectedContact && (
    <TextEditorPanel contact={selectedContact} />
  )}
</Drawer>

      </Box>
    </>
  );
};

export default ContactsCentre;
