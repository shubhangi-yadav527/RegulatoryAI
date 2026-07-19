import React, { useState, useEffect } from 'react';
import {
  Box, Card, Typography, LinearProgress, Chip, Button, useTheme,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';

const BACKEND_URL = 'http://localhost:8000';

export default function DepartmentImpact() {
  const theme = useTheme();

  const [departments, setDepartments] = useState([
    {
      name: 'Loans',
      compliance: 89,
      risk: 'Medium',
      emissions: 12.5,
      cost: '€0.8M',
      recommendation: 'Enhance AI model monitoring',
    },
    {
      name: 'Core Banking',
      compliance: 94,
      risk: 'Low',
      emissions: 8.2,
      cost: '€0.4M',
      recommendation: 'Maintain current controls',
    },
    {
      name: 'Deposits',
      compliance: 85,
      risk: 'High',
      emissions: 10.3,
      cost: '€1.1M',
      recommendation: 'Implement governance framework',
    },
  ]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        console.log('DepartmentImpact: Fetching departments from:', `${BACKEND_URL}/api/departments`);
        const response = await fetch(`${BACKEND_URL}/api/departments`);
        if (response.ok) {
          const data = await response.json();
          console.log('DepartmentImpact: Received BQ data:', data);
          if (data && data.departments) {
            setDepartments(data.departments);
          }
        } else {
          console.error('DepartmentImpact: API response error status:', response.status);
        }
      } catch (err) {
        console.error('DepartmentImpact: Fetch error:', err);
      }
    };
    fetchDepartments();
  }, []);

  const getRiskColor = (risk) => {
    const lvl = (risk || '').toLowerCase();
    if (lvl === 'low') return theme.palette.success.main;
    if (lvl === 'high' || lvl === 'severe') return theme.palette.error.main;
    return theme.palette.warning.main;
  };


  const totalDepts = departments.length;
  const compliantCount = departments.filter(d => (d.risk || '').toLowerCase() === 'low').length;
  const mediumCount = departments.filter(d => (d.risk || '').toLowerCase() === 'medium').length;
  const highCount = departments.filter(d => (d.risk || '').toLowerCase() === 'high' || (d.risk || '').toLowerCase() === 'severe').length;

  return (
    <Box sx={{ height: '100%', pr: { xs: 0, md: 22 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: { xs: 'auto', md: '1fr auto' },
          gap: 2.5,
          height: { xs: 'auto', md: 'calc(84vh - 120px)' },
          minHeight: { xs: 'auto', md: '520px' }
        }}
      >
        {/* ROW 1: Department Cards Wrapper with internal scroll */}
        <Box sx={{ overflowY: 'auto', pr: 1, height: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2.5, pb: 1 }}>
            {departments.map((dept, idx) => (
              <Card key={idx} className="glass-card" sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '0.95rem' }}>
                    {dept.name}
                  </Typography>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: `${getRiskColor(dept.risk)}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <BuildIcon sx={{ color: getRiskColor(dept.risk), fontSize: '1rem' }} />
                  </Box>
                </Box>

                {/* Compliance */}
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem' }}>
                      Compliance
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.75rem' }}>
                      {dept.compliance}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={dept.compliance}
                    sx={{
                      height: 5,
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(0, 24, 168, 0.06)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: dept.compliance > 90 ? theme.palette.success.main : theme.palette.warning.main,
                        borderRadius: 2.5,
                      },
                    }}
                  />
                </Box>

                {/* Risk & Carbon & Cost info */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, my: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', display: 'block' }}>Risk Score</Typography>
                    <Chip
                      label={dept.risk}
                      size="small"
                      sx={{
                        bgcolor: getRiskColor(dept.risk),
                        color: 'white',
                        fontWeight: 700,
                        height: 16,
                        fontSize: '0.62rem',
                        mt: 0.2
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', display: 'block' }}>Emissions</Typography>
                    <Typography sx={{ fontWeight: 750, fontSize: '0.85rem', mt: 0.2 }}>
                      {dept.emissions}T
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', display: 'block' }}>Cost</Typography>
                    <Typography sx={{ fontWeight: 750, color: getRiskColor(dept.risk), fontSize: '0.85rem', mt: 0.2 }}>
                      {dept.cost}
                    </Typography>
                  </Box>
                </Box>

                {/* AI Recommendation */}
                <Box sx={{ p: 1, bgcolor: 'rgba(0, 24, 168, 0.02)', borderRadius: '6px', border: '1px dashed rgba(0, 24, 168, 0.06)', mb: 1.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.7rem', display: 'block', mb: 0.2 }}>
                    🤖 AI Recommendation
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.primary', fontSize: '0.72rem', display: 'block', lineHeight: 1.25 }}>
                    {dept.recommendation}
                  </Typography>
                </Box>

                <Button fullWidth variant="outlined" size="small" sx={{ py: 0.15, fontSize: '0.72rem', minHeight: 24 }}>
                  Detailed Report
                </Button>
              </Card>
            ))}
          </Box>
        </Box>

        {/* ROW 2: Summary Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2.5 }}>
          {[
            { icon: <CheckCircleIcon sx={{ fontSize: '1.4rem', color: 'success.main' }} />, title: 'Compliant Departments', value: `${compliantCount}/${totalDepts}`, bg: 'rgba(16, 185, 129, 0.04)' },
            { icon: <WarningIcon sx={{ fontSize: '1.4rem', color: 'warning.main' }} />, title: 'Medium Risk', value: `${mediumCount}/${totalDepts}`, bg: 'rgba(245, 158, 11, 0.04)' },
            { icon: <WarningIcon sx={{ fontSize: '1.4rem', color: 'error.main' }} />, title: 'High Risk', value: `${highCount}/${totalDepts}`, bg: 'rgba(239, 68, 68, 0.04)' },
          ].map((item, i) => (
            <Card key={i} className="glass-card" sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: item.bg }}>
              {item.icon}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', mt: 0.1, lineHeight: 1, fontSize: '1rem' }}>
                  {item.value}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
