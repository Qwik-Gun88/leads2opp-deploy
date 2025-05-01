import React, { useState, useRef } from 'react';
import {
  Box, Typography, Paper, Grid, Button, Divider, Select, MenuItem
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, FunnelChart, Funnel, LabelList
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import HeaderAppBar from '../../components/layout/HeaderAppBar';


const emailData = [
  { name: 'Email 1', open: 120, click: 45 },
  { name: 'Email 2', open: 98, click: 30 },
  { name: 'Email 3', open: 70, click: 15 },
];

const callData = [
  { name: 'Connected', value: 65 },
  { name: 'Skipped', value: 35 },
];

const funnelData = [
  { name: 'Email 1 Sent', value: 100 },
  { name: 'Opened', value: 76 },
  { name: 'Clicked', value: 40 },
  { name: 'Call 1 Completed', value: 25 },
  { name: 'Sequence Replied', value: 12 },
];

const leaderboardData = {
  '7': [
    { name: 'Alex', replies: 14 },
    { name: 'Riya', replies: 9 },
  ],
  '30': [
    { name: 'Alex', replies: 45 },
    { name: 'Riya', replies: 29 },
  ],
};

const COLORS = ['#00e676', '#facc15'];

const AnalyticsReporting = () => {
  const [timeframe, setTimeframe] = useState('7');
  const emailChartRef = useRef(null);

  const exportCSV = () => {
    const rows = [
      ['Step', 'Open Rate', 'Click Rate'],
      ...emailData.map(d => [d.name, d.open, d.click])
    ];
    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analytics.csv';
    link.click();
  };

  const exportPDF = () => {
    const logo = new Image();
    logo.src = '/assets/logo.png';
  
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 10, 10, 40, 15); // x, y, width, height
  
      doc.setFontSize(16);
      doc.setTextColor('#00e6ff');
      doc.text('Leads2Opp Engagement Summary', 60, 20);
  
      doc.setFontSize(10);
      doc.setTextColor('#666');
      doc.text(`Generated: ${new Date().toLocaleString()}`, 60, 26);
  
      // Table-style data (simple email performance)
      doc.setTextColor('#000');
      let startY = 40;
      emailData.forEach((item, i) => {
        doc.text(`${item.name} — Opens: ${item.open}, Clicks: ${item.click}`, 10, startY + i * 10);
      });
  
      doc.save('leads2opp_report.pdf');
    };
  };

  return (
    <>
    {/* FIXED NAVBAR AT TOP */}
    <HeaderAppBar />
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #0b0f19, #0f1b2c)', color: '#ffffff', p: 10 }}>
      <Typography variant="h4" fontWeight={700} mb={4} sx={{ textShadow: '0 0 10px #00e6ff', color: '#38bdf8' }}>
        📊 Analytics & Reporting
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: '#1e2a38', boxShadow: '0 0 20px #00e6ff33' }}>
            <Typography variant="h6" sx={{ color: '#00e6ff', mb: 2 }}>📧 Email Open & Click Rates</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={emailData}>
                <XAxis dataKey="name" stroke="#90caf9" />
                <YAxis stroke="#90caf9" />
                <Tooltip />
                <Bar dataKey="open" fill="#38bdf8" name="Opened" />
                <Bar dataKey="click" fill="#facc15" name="Clicked" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: '#1e2a38', boxShadow: '0 0 20px #00e6ff33' }}>
            <Typography variant="h6" sx={{ color: '#00e6ff', mb: 2 }}>☎️ Call Outcomes</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={callData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {callData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6, borderColor: '#334155' }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#1e2a38', borderRadius: 3, boxShadow: '0 0 20px #00e6ff33' }}>
            <Typography variant="h6" sx={{ color: '#00e6ff', mb: 2 }}>🔻 Drop-Off Funnel</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <FunnelChart>
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="right" fill="#ffffff" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#1e2a38', borderRadius: 3, boxShadow: '0 0 20px #38bdf833' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ color: '#38bdf8' }}>🏆 Top Performers</Typography>
              <Select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                sx={{ color: '#00e6ff', border: '1px solid #00e6ff', fontSize: 14, height: 32, '& svg': { color: '#00e6ff' } }}
              >
                <MenuItem value="7">Last 7 Days</MenuItem>
                <MenuItem value="30">Last 30 Days</MenuItem>
              </Select>
            </Box>
            {leaderboardData[timeframe].map((rep, i) => (
              <Typography key={i} sx={{ color: '#90caf9', mb: 1 }}>
                {i + 1}. {rep.name} — {rep.replies} replies
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Box mt={6} display="flex" gap={2}>
        <Button onClick={exportCSV} variant="outlined" sx={{ color: '#00e6ff', borderColor: '#00e6ff' }}>
          📤 Export CSV
        </Button>
        <Button onClick={exportPDF} variant="outlined" sx={{ color: '#38bdf8', borderColor: '#38bdf8' }}>
          📊 Download PDF
        </Button>
      </Box>

      <Paper sx={{ mt: 6, p: 3, backgroundColor: '#0e1826', borderRadius: 3, boxShadow: '0 0 20px #00e6ff55' }}>
        <Typography variant="h6" sx={{ color: '#00e6ff', mb: 1 }}>🤖 AI Insight</Typography>
        <Typography variant="body2" sx={{ color: '#90caf9' }}>
          Sequences with 3+ steps including <strong>LinkedIn InMail</strong> saw a 22% higher reply rate.
        </Typography>
      </Paper>
    </Box>
    </>
  );
};

export default AnalyticsReporting;
