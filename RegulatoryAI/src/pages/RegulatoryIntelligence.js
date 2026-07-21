import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Card, Typography, Chip, Button, Badge, useTheme,
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';
import GavelIcon from '@mui/icons-material/Gavel';
import InfoIcon from '@mui/icons-material/Info';

export default function RegulatoryIntelligence() {
  const navigate = useNavigate();
  const theme = useTheme();

  const regulations = [
    {
      name: 'EU AI Act',
      severity: 'high',
      date: 'Q3 2026',
      impact: 'Comprehensive AI governance framework',
      departments: 2,
      cost: '€2.1M',
    },
    {
      name: 'DORA',
      severity: 'medium',
      date: 'Q4 2026',
      impact: 'Digital Operational Resilience Act',
      departments: 2,
      cost: '€1.2M',
    },
    {
      name: 'GDPR',
      severity: 'compliant',
      date: 'Active',
      impact: 'Data protection compliance maintained',
      departments: 4,
      cost: '€0.5M',
    },
    {
      name: 'Basel III',
      severity: 'neutral',
      date: 'Ongoing',
      impact: 'Capital adequacy standards',
      departments: 1,
      cost: '€0.3M',
    },
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      high: theme.palette.error.main,
      medium: theme.palette.warning.main,
      compliant: theme.palette.success.main,
      neutral: '#9CA3AF',
    };
    return colors[severity] || theme.palette.primary.main;
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      high: 'High',
      medium: 'Medium',
      compliant: 'Compliant',
      neutral: 'Neutral',
    };
    return labels[severity] || 'Unknown';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Regulatory Intelligence
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            AI-generated summaries and impact assessments of active and upcoming regulations
          </Typography>
        </Grid>

        {/* Timeline */}
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 4, background: theme.palette.background.paper, color: '#E0E0E0' }}>
            <Timeline position="alternate">
              {regulations.map((reg, idx) => (
                <TimelineItem key={idx}>
                  <TimelineOppositeContent color="textSecondary">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {reg.date}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        bgcolor: getSeverityColor(reg.severity),
                        width: 16,
                        height: 16,
                      }}
                    />
                    {idx < regulations.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ pb: 3 }}>
                    <Card
                      sx={{
                        p: 2,
                        background: theme.palette.background.paper,
                        color: '#E0E0E0',
                        border: `1px solid ${getSeverityColor(reg.severity)}22`,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {reg.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={getSeverityLabel(reg.severity)}
                          size="small"
                          sx={{
                            bgcolor: getSeverityColor(reg.severity),
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label={`${reg.departments} Depts`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                        {reg.impact}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          Est. Cost: {reg.cost}
                        </Typography>
                      </Box>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Card>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {regulations.slice(0, 2).map((reg, idx) => (
              <Card key={idx} sx={{ p: 2.5, background: theme.palette.background.paper, color: '#E0E0E0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {reg.name}
                  </Typography>
                  <Chip
                    label={getSeverityLabel(reg.severity)}
                    size="small"
                    sx={{
                      bgcolor: getSeverityColor(reg.severity),
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                  {reg.impact}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {['Review Risk', 'Update Policies', 'Training Required'].map((action, i) => (
                    <Chip
                      key={i}
                      label={action}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/departments', { state: { framework: reg.name } })}
                >
                  View Impact
                </Button>
              </Card>
            ))}

            <Card sx={{ p: 2.5, background: theme.palette.background.paper, color: '#E0E0E0' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                📊 Compliance Score
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                82%
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Across all active regulations
              </Typography>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
