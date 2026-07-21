import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box, Container, Grid, Card, Typography, LinearProgress, Chip, Button, useTheme,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ProgressCard, KPICard } from '../components/KPICards';

const frameworkImpactMap = {
  'EU AI Act': ['Loans', 'Core Banking', 'Deposits'],
  'DORA': ['Core Banking', 'Loans'],
  'GDPR': ['Loans', 'Core Banking', 'Deposits'],
  'Basel III': ['Loans'],
};

export default function DepartmentImpact() {
  const theme = useTheme();
  const location = useLocation();

  const [selectedFramework, setSelectedFramework] = useState(
    location.state?.framework || 'All'
  );

  useEffect(() => {
    if (location.state?.framework) {
      setSelectedFramework(location.state.framework);
    }
  }, [location.state]);

  const departments = [
    {
      name: 'Loans',
      compliance: 89,
      risk: 'Medium',
      emissions: 12.5,
      cost: '€0.8M',
      recommendation: 'Enhance AI model monitoring',
      color: 'warning',
    },
    {
      name: 'Core Banking',
      compliance: 94,
      risk: 'Low',
      emissions: 8.2,
      cost: '€0.4M',
      recommendation: 'Maintain current controls',
      color: 'success',
    },
    {
      name: 'Deposits',
      compliance: 85,
      risk: 'High',
      emissions: 10.3,
      cost: '€1.1M',
      recommendation: 'Implement governance framework',
      color: 'error',
    },
  ];

  const getRiskColor = (risk) => {
    const colors = {
      Low: theme.palette.success.main,
      Medium: theme.palette.warning.main,
      High: theme.palette.error.main,
    };
    return colors[risk] || theme.palette.primary.main;
  };

  const filteredDepartments = (selectedFramework === 'All' || !frameworkImpactMap[selectedFramework])
    ? departments
    : departments.filter(d => frameworkImpactMap[selectedFramework].includes(d.name));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Department Impact Analysis
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        AI-driven compliance, risk, and sustainability metrics by department
      </Typography>

      {/* Framework Filter Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <FilterListIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem' }}>
            Filter by Framework:
          </Typography>
          {['All', 'EU AI Act', 'DORA', 'GDPR', 'Basel III'].map((fw) => (
            <Chip
              key={fw}
              label={fw}
              size="small"
              clickable
              onClick={() => setSelectedFramework(fw)}
              color={selectedFramework === fw ? 'primary' : 'default'}
              variant={selectedFramework === fw ? 'filled' : 'outlined'}
              sx={{ fontWeight: 650, fontSize: '0.75rem' }}
            />
          ))}
        </Box>
        {selectedFramework !== 'All' && (
          <Button
            size="small"
            variant="text"
            onClick={() => setSelectedFramework('All')}
            sx={{ fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}
          >
            Show All Departments
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {filteredDepartments.map((dept, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card sx={{ p: 3, height: '100%', background: theme.palette.background.paper, color: '#E0E0E0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {dept.name}
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: `${theme.palette[dept.color].main}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BuildIcon sx={{ color: theme.palette[dept.color].main, fontSize: '1.5rem' }} />
                </Box>
              </Box>

              {/* Compliance */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Compliance
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {dept.compliance}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={dept.compliance}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.divider,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: dept.compliance > 90 ? theme.palette.success.main : theme.palette.warning.main,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>

              {/* Risk Score */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Risk Score
                </Typography>
                <Chip
                  label={dept.risk}
                  sx={{
                    bgcolor: getRiskColor(dept.risk),
                    color: 'white',
                    fontWeight: 700,
                  }}
                />
              </Box>

              {/* Carbon Emissions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Carbon Emissions
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {dept.emissions}
                  <Typography component="span" variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>
                    Tons CO₂
                  </Typography>
                </Typography>
              </Box>

              {/* Estimated Cost */}
              <Box sx={{ mb: 3, pb: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Est. Implementation Cost
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette[dept.color].main }}>
                  {dept.cost}
                </Typography>
              </Box>

              {/* AI Recommendation */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  🤖 AI Recommendation
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {dept.recommendation}
                </Typography>
              </Box>

              <Button fullWidth variant="outlined">
                View Detailed Report
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Summary Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, background: theme.palette.background.paper, color: '#E0E0E0', border: `1px solid ${theme.palette.success.main}22` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleIcon sx={{ fontSize: '2rem', color: 'success.main' }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Compliant Departments
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                  1/3
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, background: theme.palette.background.paper, color: '#E0E0E0', border: `1px solid ${theme.palette.warning.main}22` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <WarningIcon sx={{ fontSize: '2rem', color: 'warning.main' }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Medium Risk
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  1/3
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, background: theme.palette.background.paper, color: '#E0E0E0', border: `1px solid ${theme.palette.error.main}22` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <WarningIcon sx={{ fontSize: '2rem', color: 'error.main' }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  High Risk
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>
                  1/3
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
