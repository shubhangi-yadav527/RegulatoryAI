import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Card, Typography, Chip, useTheme,
} from '@mui/material';
import { ProgressCard } from '../components/KPICards';

export default function EnterpriseRiskDashboard() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const filterRegulation = location.state?.regulation || null;

  const REGULATION_RISKS_MAP = {
    'EU AI Act': ['Model Risk', 'AI Explanation Risk', 'Compliance Risk'],
    'DORA': ['Cyber Risk', 'Operational Risk'],
    'GDPR': ['Cyber Risk', 'Compliance Risk'],
    'Basel III': ['FSG Risk', 'Operational Risk']
  };

  const riskCategories = [
    { label: 'Compliance Risk', percentage: 28, color: 'error' },
    { label: 'Operational Risk', percentage: 45, color: 'warning' },
    { label: 'Cyber Risk', percentage: 35, color: 'error' },
    { label: 'FSG Risk', percentage: 52, color: 'warning' },
    { label: 'Model Risk', percentage: 38, color: 'warning' },
    { label: 'AI Explanation Risk', percentage: 22, color: 'success' },
  ];

  const filteredCategories = filterRegulation && REGULATION_RISKS_MAP[filterRegulation]
    ? riskCategories.filter(c => REGULATION_RISKS_MAP[filterRegulation].includes(c.label))
    : riskCategories;

  const overallRiskScore = filteredCategories.length > 0
    ? Math.round(filteredCategories.reduce((acc, curr) => acc + curr.percentage, 0) / filteredCategories.length)
    : 0;

  const getRiskLevelFromScore = (score) => {
    if (score < 30) return 'Low';
    if (score > 60) return 'High';
    return 'Medium';
  };

  const overallRiskLevel = getRiskLevelFromScore(overallRiskScore);

  const getRiskColor = (level) => {
    const lvl = (level || '').toLowerCase();
    if (lvl === 'low') return theme.palette.success.main;
    if (lvl === 'high' || lvl === 'severe') return theme.palette.error.main;
    return theme.palette.warning.main;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Enterprise Risk Dashboard
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Comprehensive risk assessment across all governance domains
      </Typography>

      <Grid container spacing={3}>
        {/* Central Risk Gauge */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 4, textAlign: 'center', height: '100%', background: theme.palette.background.paper, color: '#E0E0E0' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontWeight: 500 }}>
              Overall Risk Level
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 3,
              }}
            >
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: `conic-gradient(${getRiskColor(overallRiskLevel)} 0deg ${overallRiskScore * 3.6}deg, #E5E7EB ${overallRiskScore * 3.6}deg 360deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, color: `${overallRiskLevel.toLowerCase() === 'low' ? 'success' : overallRiskLevel.toLowerCase() === 'high' ? 'error' : 'warning'}.main` }}>
                    {overallRiskScore}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {overallRiskLevel}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Based on {filteredCategories.length} risk categories
            </Typography>
          </Card>
        </Grid>

        {/* Risk Categories */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, background: theme.palette.background.paper, color: '#E0E0E0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Risk Category Breakdown {filterRegulation && `(${filterRegulation})`}
              </Typography>
              {filterRegulation && (
                <Chip
                  label="Clear"
                  size="small"
                  onDelete={() => navigate('/risks', { replace: true, state: {} })}
                  color="primary"
                  sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700 }}
                />
              )}
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {filteredCategories.map((risk, idx) => (
                <ProgressCard
                  key={idx}
                  title={risk.label}
                  percentage={risk.percentage}
                  color={risk.color}
                />
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Detailed Analysis */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Risk Analysis Summary
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {[
                {
                  title: 'Critical Issues',
                  value: filteredCategories.filter(c => c.color === 'error').length.toString(),
                  desc: 'Requiring immediate action',
                  color: 'error',
                },
                {
                  title: 'Medium Priority',
                  value: filteredCategories.filter(c => c.color === 'warning').length.toString(),
                  desc: 'Address within 30 days',
                  color: 'warning',
                },
                {
                  title: 'Low Priority',
                  value: filteredCategories.filter(c => c.color === 'success').length.toString(),
                  desc: 'Monitor and plan',
                  color: 'success',
                },
              ].map((item, i) => (
              <Card key={i} sx={{ p: 2, background: theme.palette.background.paper, color: '#E0E0E0', border: `1px solid ${theme.palette[item.color].main}22` }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette[item.color].main,
                      mb: 0.5,
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {item.desc}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Trend Analysis */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, background: theme.palette.background.paper, color: '#E0E0E0' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Trend Analysis (Last 90 Days)
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 1,
                height: 150,
                justifyContent: 'center',
              }}
            >
              {[65, 72, 68, 55, 48, 45, 42, 44, overallRiskScore].map((val, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    height: `${val}%`,
                    bgcolor:
                      val > 60
                        ? theme.palette.error.main
                        : val > 45
                        ? theme.palette.warning.main
                        : theme.palette.success.main,
                    borderRadius: '4px 4px 0 0',
                    opacity: 0.8,
                    transition: 'all 0.2s',
                    '&:hover': { opacity: 1 },
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1, textAlign: 'center' }}>
              Risk level showing improvement trend
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
