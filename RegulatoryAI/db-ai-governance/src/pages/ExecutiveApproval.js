import React, { useState } from 'react';
import {
  Box, Card, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Chip, useTheme, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

export default function ExecutiveApproval() {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const approvalItems = [
    {
      id: 1,
      title: 'EU AI Act Compliance Framework',
      department: 'Risk Management',
      risk: 'High',
      cost: '€0.8M',
      savings: '€0.4M',
      timeline: '8 weeks',
      carbonReduction: '2.1 Tons CO₂',
      status: 'Pending',
      description: 'Implement comprehensive AI governance framework aligned with EU AI Act requirements.',
      actions: ['Risk Assessment', 'Policy Update', 'Staff Training', 'Audit Compliance'],
    },
    {
      id: 2,
      title: 'Automated Compliance Reporting',
      department: 'Compliance',
      risk: 'Medium',
      cost: '€0.4M',
      savings: '€0.6M',
      timeline: '6 weeks',
      carbonReduction: '1.8 Tons CO₂',
      status: 'Pending',
      description: 'Deploy automated reporting system to reduce manual compliance tasks.',
      actions: ['System Design', 'Integration', 'Testing', 'Deployment'],
    },
    {
      id: 3,
      title: 'Data Center Energy Optimization',
      department: 'Operations',
      risk: 'Low',
      cost: '€0.2M',
      savings: '€0.3M',
      timeline: '4 weeks',
      carbonReduction: '3.2 Tons CO₂',
      status: 'Pending',
      description: 'Implement AI-driven optimization of data center operations.',
      actions: ['Assessment', 'Implementation', 'Monitoring'],
    },
  ];

  const getRiskColor = (risk) => {
    const colors = {
      High: theme.palette.error.main,
      Medium: theme.palette.warning.main,
      Low: theme.palette.success.main,
    };
    return colors[risk] || theme.palette.primary.main;
  };

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleApprove = () => {
    alert(`✅ ${selectedItem.title} approved!`);
    handleCloseDialog();
  };

  const handleReject = () => {
    alert(`❌ ${selectedItem.title} rejected.`);
    handleCloseDialog();
  };

  return (
    <Box sx={{ height: '100%', pr: { xs: 0, md: 22 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: { xs: 'auto', md: 'auto 1fr' },
          gap: 2.5,
          height: { xs: 'auto', md: 'calc(84vh - 120px)' },
          minHeight: { xs: 'auto', md: '520px' }
        }}
      >
        {/* ROW 1: Summary Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2.5 }}>
          {[
            { label: 'Pending Approvals', value: approvalItems.length, color: 'warning.main', bg: 'rgba(245, 158, 11, 0.04)' },
            { label: 'Total Investment', value: '€1.4M', color: 'error.main', bg: 'rgba(239, 68, 68, 0.04)' },
            { label: 'Total Savings', value: '€1.3M', color: 'success.main', bg: 'rgba(16, 185, 129, 0.04)' },
            { label: 'CO₂ Reduction', value: '7.1 T', color: 'secondary.main', bg: 'rgba(0, 24, 168, 0.04)' },
          ].map((item, idx) => (
            <Card key={idx} className="glass-card" sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2, bgcolor: item.bg }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: item.color, mt: 0.1, lineHeight: 1 }}>
                  {item.value}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        {/* ROW 2: Approval Table in scrollable wrapper */}
        <TableContainer component={Card} className="glass-card" sx={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', bgcolor: 'rgba(255, 255, 255, 0.9) !important' }}>Action Plan</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', bgcolor: 'rgba(255, 255, 255, 0.9) !important' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', bgcolor: 'rgba(255, 255, 255, 0.9) !important' }}>Risk</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', bgcolor: 'rgba(255, 255, 255, 0.9) !important' }} align="right">Cost</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', bgcolor: 'rgba(255, 255, 255, 0.9) !important' }} align="right">Savings</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', bgcolor: 'rgba(255, 255, 255, 0.9) !important' }} align="right">Timeline</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', bgcolor: 'rgba(255, 255, 255, 0.9) !important' }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approvalItems.map((item) => (
                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'rgba(0, 24, 168, 0.02)' } }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.62rem' }}>
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.7rem' }}>{item.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.risk}
                      size="small"
                      sx={{
                        bgcolor: getRiskColor(item.risk),
                        color: 'white',
                        fontWeight: 700,
                        height: 14,
                        fontSize: '0.52rem'
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>{item.cost}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: 'success.main', fontSize: '0.7rem' }}>{item.savings}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.7rem' }}>{item.timeline}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<InfoIcon sx={{ fontSize: '0.8rem !important' }} />}
                      onClick={() => handleOpenDialog(item)}
                      sx={{ fontSize: '0.62rem', py: 0.1, minHeight: 24 }}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedItem && (
          <>
            <DialogTitle sx={{ fontWeight: 800, fontSize: '1.05rem', pb: 1 }}>
              {selectedItem.title}
            </DialogTitle>
            <DialogContent sx={{ py: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.65rem', display: 'block', mb: 0.5 }}>
                    Description
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', lineHeight: 1.3 }}>{selectedItem.description}</Typography>
                </Box>

                <Box sx={{ bgcolor: 'rgba(0, 24, 168, 0.02)', p: 1.5, borderRadius: 1.5, border: '1px solid rgba(0, 24, 168, 0.05)' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 1, fontSize: '0.65rem' }}>
                    Key Metrics
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem' }}>
                        Investment
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'error.main', fontSize: '0.72rem' }}>
                        {selectedItem.cost}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6' }}>
                        Expected Savings
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main', fontSize: '0.72rem' }}>
                        {selectedItem.savings}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6' }}>
                        Timeline
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.72rem' }}>
                        {selectedItem.timeline}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6' }}>
                        CO₂ Reduction
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'secondary.main', fontSize: '0.72rem' }}>
                        {selectedItem.carbonReduction}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.65rem', display: 'block', mb: 0.5 }}>
                    Action Items
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedItem.actions.map((action, i) => (
                      <Chip key={i} label={action} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 16 }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleReject}
                size="small"
                sx={{ fontSize: '0.65rem' }}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={handleApprove}
                size="small"
                sx={{ fontSize: '0.65rem' }}
              >
                Approve
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
