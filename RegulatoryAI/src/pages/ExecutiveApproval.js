import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Card, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Chip, useTheme, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

export default function ExecutiveApproval() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filterDepartment = location.state?.department || null;

  const approvalItems = [
    {
      id: 1,
      title: 'EU AI Act Compliance Framework',
      department: 'Loans',
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
      department: 'Core Banking',
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
      department: 'Deposits',
      risk: 'Low',
      cost: '€0.2M',
      savings: '€0.3M',
      timeline: '4 weeks',
      carbonReduction: '3.2 Tons CO₂',
      status: 'Pending',
      description: 'Implement AI-driven optimization of data center operations.',
      actions: ['Assessment', 'Implementation', 'Monitoring'],
    },
    {
      id: 4,
      title: 'Risk-weighted Asset Modeling',
      department: 'Treasury',
      risk: 'High',
      cost: '€0.9M',
      savings: '€0.5M',
      timeline: '10 weeks',
      carbonReduction: '1.2 Tons CO₂',
      status: 'Pending',
      description: 'Optimize treasury capital buffers and risk-weighted asset modeling under Basel III rules.',
      actions: ['Model Development', 'Validation', 'Stress Testing'],
    },
    {
      id: 5,
      title: 'Digital Resiliency (DORA) Framework',
      department: 'Cyber Security',
      risk: 'High',
      cost: '€0.6M',
      savings: '€0.3M',
      timeline: '8 weeks',
      carbonReduction: '0.8 Tons CO₂',
      status: 'Pending',
      description: 'Upgrade network segmentation and ICT operational resilience to comply with DORA rules.',
      actions: ['Vulnerability Scan', 'Resilience Plan', 'Testing'],
    },
    {
      id: 6,
      title: 'AML Transaction Auditing Automation',
      department: 'Payments',
      risk: 'Medium',
      cost: '€0.5M',
      savings: '€0.3M',
      timeline: '6 weeks',
      carbonReduction: '1.0 Tons CO₂',
      status: 'Pending',
      description: 'Automate anti-money laundering auditing workflows for cross-border transaction compliance.',
      actions: ['Audit Integration', 'Compliance Review'],
    }
  ];

  const filteredApprovalItems = filterDepartment
    ? approvalItems.filter(item => item.department.toLowerCase() === filterDepartment.toLowerCase())
    : approvalItems;

  const calculateTotalCost = (items) => {
    const sum = items.reduce((acc, curr) => {
      const num = parseFloat(curr.cost.replace(/[^0-9.]/g, ''));
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
    return `€${sum.toFixed(1)}M`;
  };

  const calculateTotalSavings = (items) => {
    const sum = items.reduce((acc, curr) => {
      const num = parseFloat(curr.savings.replace(/[^0-9.]/g, ''));
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
    return `€${sum.toFixed(1)}M`;
  };

  const calculateTotalCarbon = (items) => {
    const sum = items.reduce((acc, curr) => {
      const num = parseFloat(curr.carbonReduction.replace(/[^0-9.]/g, ''));
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
    return `${sum.toFixed(1)} T`;
  };

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Executive Approval Queue
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Review and approve pending AI governance action plans
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.50' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
              {filteredApprovalItems.length}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Pending Approvals
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'error.50' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
              {calculateTotalCost(filteredApprovalItems)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Investment
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'success.50' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
              {calculateTotalSavings(filteredApprovalItems)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Savings
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.50' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
              {calculateTotalCarbon(filteredApprovalItems)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              CO₂ Reduction
            </Typography>
          </Card>
        </Grid>

        {/* Approval Items */}
        <Grid item xs={12}>
          <TableContainer component={Card}>
            {filterDepartment && (
              <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Showing recommendations for: <strong>{filterDepartment}</strong> department
                </Typography>
                <Chip
                  label="Clear"
                  size="small"
                  onDelete={() => navigate('/approval', { replace: true, state: {} })}
                  color="primary"
                  sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700 }}
                />
              </Box>
            )}
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.50' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Action Plan</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Risk Level</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Cost
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Savings
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Timeline
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApprovalItems.map((item) => (
                  <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{item.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.risk}
                        sx={{
                          bgcolor: getRiskColor(item.risk),
                          color: 'white',
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.cost}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {item.savings}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{item.timeline}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<InfoIcon />}
                        onClick={() => handleOpenDialog(item)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedItem && (
          <>
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.2rem' }}>
              {selectedItem.title}
            </DialogTitle>
            <DialogContent sx={{ py: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                    Description
                  </Typography>
                  <Typography variant="body2">{selectedItem.description}</Typography>
                </Box>

                <Box sx={{ bgcolor: '#F9FAFB', p: 2, borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Key Metrics
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Investment
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'error.main' }}>
                        {selectedItem.cost}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Expected Savings
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>
                        {selectedItem.savings}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Timeline
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {selectedItem.timeline}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        CO₂ Reduction
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                        {selectedItem.carbonReduction}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                    Action Items
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedItem.actions.map((action, i) => (
                      <Chip key={i} label={action} size="small" variant="outlined" />
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
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={handleApprove}
              >
                Approve
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
