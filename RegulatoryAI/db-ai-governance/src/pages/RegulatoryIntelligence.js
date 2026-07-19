import React from 'react';
import {
  Box, Card, Typography, Chip, Button, useTheme,
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';


export default function RegulatoryIntelligence() {
  const theme = useTheme();

  const regulations = [
    {
      name: 'EU AI Act',
      severity: 'high',
      date: 'Q3 2024',
      impact: 'Comprehensive AI governance framework',
      departments: 3,
      cost: '€2.1M',
    },
    {
      name: 'DORA',
      severity: 'medium',
      date: 'Q4 2024',
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
    <Box sx={{ height: '100%', pr: { xs: 0, md: 22 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' },
          gap: 2.5,
          height: { xs: 'auto', md: 'calc(84vh - 120px)' },
          minHeight: { xs: 'auto', md: '520px' }
        }}
      >
        {/* Column 1: Timeline Card with internal scrolling */}
        <Card className="glass-card" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', mb: 1 }}>
            Upcoming Regulations Timeline
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
            <Timeline position="alternate" sx={{ p: 0 }}>
              {regulations.map((reg, idx) => (
                <TimelineItem key={idx}>
                  <TimelineOppositeContent color="textSecondary" sx={{ py: 1, px: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.65rem' }}>
                      {reg.date}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        bgcolor: getSeverityColor(reg.severity),
                        width: 12,
                        height: 12,
                        boxShadow: 'none',
                        my: 1
                      }}
                    />
                    {idx < regulations.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: 1, px: 1 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        backgroundColor: 'rgba(0, 24, 168, 0.01)',
                        border: `1px solid ${getSeverityColor(reg.severity)}22`,
                        borderRadius: '8px',
                        textAlign: 'left'
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, fontSize: '0.75rem', mb: 0.2 }}>
                        {reg.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.62rem', mb: 0.5, lineHeight: 1.2 }}>
                        {reg.impact}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.6rem' }}>
                          Cost: {reg.cost}
                        </Typography>
                        <Chip
                          label={getSeverityLabel(reg.severity)}
                          size="small"
                          sx={{
                            bgcolor: getSeverityColor(reg.severity),
                            color: 'white',
                            fontWeight: 700,
                            height: 14,
                            fontSize: '0.55rem'
                          }}
                        />
                      </Box>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </Card>

        {/* Column 2: Score and Summaries */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', minHeight: 0 }}>
          {/* Compliance Score */}
          <Card className="glass-card" sx={{ p: 2, bgcolor: 'rgba(0, 24, 168, 0.04)', border: '1px solid rgba(0, 24, 168, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.65rem' }}>
                📊 Compliance Score
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.6rem', mt: 0.2 }}>
                Across all active regulations
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.8rem' }}>
              82%
            </Typography>
          </Card>

          {/* Summary Cards list */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1, overflowY: 'auto', pr: 0.5, minHeight: 0 }}>
            {regulations.slice(0, 2).map((reg, idx) => (
              <Card key={idx} className="glass-card" sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '0.8rem' }}>
                    {reg.name}
                  </Typography>
                  <Chip
                    label={getSeverityLabel(reg.severity)}
                    size="small"
                    sx={{
                      bgcolor: getSeverityColor(reg.severity),
                      color: 'white',
                      fontWeight: 700,
                      height: 16,
                      fontSize: '0.6rem'
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontSize: '0.65rem', lineHeight: 1.2 }}>
                  {reg.impact}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
                  {['Review Risk', 'Update Policies'].map((action, i) => (
                    <Chip
                      key={i}
                      label={action}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.58rem', height: 16, fontWeight: 600 }}
                    />
                  ))}
                </Box>
                <Button fullWidth variant="outlined" size="small" sx={{ py: 0.2, fontSize: '0.65rem', minHeight: 24 }}>
                  Full Report
                </Button>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
