import React from 'react';
import {
  Box, Container, Grid, Card, Typography, useTheme,
} from '@mui/material';
import { ProgressCard } from '../components/KPICards';

export default function EnterpriseRiskDashboard() {
  const theme = useTheme();

  const riskCategories = [
    { label: 'Compliance Risk', percentage: 28, color: 'error' },
    { label: 'Operational Risk', percentage: 45, color: 'warning' },
    { label: 'Cyber Risk', percentage: 35, color: 'error' },
    { label: 'FSG Risk', percentage: 52, color: 'warning' },
    { label: 'Model Risk', percentage: 38, color: 'warning' },
    { label: 'AI Explanation Risk', percentage: 22, color: 'success' },
  ];

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
                  background: `conic-gradient(${theme.palette.warning.main} 0deg 160deg, #E5E7EB 160deg 360deg)`,
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
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    44%
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Medium
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Based on 6 risk categories
            </Typography>
          </Card>
        </Grid>

        {/* Risk Categories */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, background: theme.palette.background.paper, color: '#E0E0E0' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Risk Category Breakdown
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {riskCategories.map((risk, idx) => (
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
                  value: '3',
                  desc: 'Requiring immediate action',
                  color: 'error',
                },
                {
                  title: 'Medium Priority',
                  value: '12',
                  desc: 'Address within 30 days',
                  color: 'warning',
                },
                {
                  title: 'Low Priority',
                  value: '28',
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
              {[65, 72, 68, 55, 48, 45, 42, 44, 44].map((val, i) => (
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
