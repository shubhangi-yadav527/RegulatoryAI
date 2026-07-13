import React from 'react';
import {
  Box, Container, Grid, Card, Typography, LinearProgress, useTheme,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function CostROIDashboard() {
  const theme = useTheme();

  const comparisonData = [
    {
      category: 'Infrastructure',
      current: 1200,
      optimized: 720,
      savings: 480,
    },
    {
      category: 'Compliance',
      current: 1500,
      optimized: 800,
      savings: 700,
    },
    {
      category: 'Carbon Offset',
      current: 400,
      optimized: 180,
      savings: 220,
    },
    {
      category: 'Other',
      current: 240,
      optimized: 120,
      savings: 120,
    },
  ];

  const roiTimeline = [
    { month: 'Q1 2024', roi: 0 },
    { month: 'Q2 2024', roi: 15 },
    { month: 'Q3 2024', roi: 35 },
    { month: 'Q4 2024', roi: 55 },
    { month: 'Q1 2025', roi: 80 },
    { month: 'Q2 2025', roi: 120 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Cost & ROI Analysis
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        AI governance implementation savings and ROI timeline
      </Typography>

      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'error.50' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Current Annual Cost
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
              €3.34 M
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Baseline
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.50' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              AI Optimized Cost
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
              €1.70 M
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Projected
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'success.50' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Annual Savings
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
              €1.66 M
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              49.7% reduction
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.50' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Payback Period
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              8 months
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Break-even
            </Typography>
          </Card>
        </Grid>

        {/* Cost Breakdown Comparison */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Cost Breakdown: Current vs Optimized
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF',
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Legend />
                <Bar dataKey="current" fill={theme.palette.error.main} name="Current (€K)" />
                <Bar dataKey="optimized" fill={theme.palette.success.main} name="Optimized (€K)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* ROI Timeline */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              ROI Timeline Projection
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF',
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Bar dataKey="roi" fill={theme.palette.success.main} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Breakdown Details */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Savings Breakdown
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {[
                {
                  title: 'Infrastructure Savings',
                  amount: '€480K',
                  desc: 'Optimized server usage, cloud costs',
                  color: 'primary',
                },
                {
                  title: 'Compliance Savings',
                  amount: '€700K',
                  desc: 'Automated reporting, reduced audits',
                  color: 'success',
                },
                {
                  title: 'Carbon Savings',
                  amount: '€220K',
                  desc: 'Reduced energy footprint offset credits',
                  color: 'secondary',
                },
              ].map((item, i) => (
                <Card key={i} sx={{ p: 3, bgcolor: `${theme.palette[item.color].main}10` }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette[item.color].main,
                      mb: 1,
                    }}
                  >
                    {item.amount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {item.desc}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Implementation Roadmap */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Implementation Roadmap
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].map((phase, i) => (
                <Box key={i} sx={{ flex: 1, textAlign: 'center', mr: i < 3 ? 1 : 0 }}>
                  <Box
                    sx={{
                      height: 40,
                      borderRadius: 2,
                      bgcolor: i <= 1 ? theme.palette.success.main : theme.palette.primary.main,
                      mb: 1,
                      opacity: i > 1 ? 0.3 : 1,
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {phase}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                    {i <= 1 ? 'Completed' : 'Planned'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
