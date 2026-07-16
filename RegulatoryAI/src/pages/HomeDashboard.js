import React, { useState } from 'react';
import {
  Box, Container, Grid, Card, Typography, TextField, Button, Chip,
  Avatar, Paper, useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { KPICard, CircularGaugeCard, SemiCircularGaugeCard } from '../components/KPICards';
import BuildIcon from '@mui/icons-material/Build';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FolderIcon from '@mui/icons-material/Folder';
import GavelIcon from '@mui/icons-material/Gavel'; // For Compliance Score
import WarningIcon from '@mui/icons-material/Warning'; // For Policy Violations
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'; // For Regulatory Changes

export default function HomeDashboard() {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    {
      type: 'bot',
      text: 'Which regulation has the highest impact?',
      isQuestion: true,
    },
    {
      type: 'bot',
      text: 'The EU AI Act has the highest impact on your organization. It affects 3 departments with estimated implementation cost of €2.1M.',
      metadata: {
        regulation: 'EU AI Act',
        departments: ['Risk Management', 'Compliance', 'AI Ethics'],
        cost: '€2.1M',
        actions: ['High Priority', 'Q3 2024 Deadline', 'Review Risk Assessment'],
      },
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { type: 'user', text: message }]);
      setMessage('');
      setTimeout(() => {
        setChat((prev) => [...prev, {
          type: 'bot',
          text: 'Processing your query with AI governance engine...',
        }]);
      }, 500);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* KPI Cards Row 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <CircularGaugeCard
            title="AI Governance Score"
            value={97}
            color="success"
            icon={SmartToyIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SemiCircularGaugeCard
            title="Enterprise Risk Gauge"
            value={72}
            status="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Active Regulations"
            value={18}
            unit="regulations"
            color="primary"
            icon={BuildIcon}
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="High Priority Alerts"
            value={4}
            unit="alerts"
            color="error"
            trend="↑ 2 this week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2.5, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <FolderIcon sx={{ fontSize: '2rem', color: 'success.main' }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Carbon Impact
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  31 Tons CO₂
                </Typography>
              </Box>
            </Box>
            <Chip label="↓ 40% reduction" size="small" color="success" variant="outlined" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 500 }}>
              AI Confidence
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
              {[85, 78, 92, 88, 95].map((val, i) => (
                <Box
                  key={i}
                  sx={{
                    width: '12px',
                    height: `${val}%`,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    minHeight: '20px',
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: 'success.main', mt: 1, display: 'block', fontWeight: 600 }}>
              ✓ Stable
            </Typography>
          </Card>
        </Grid>

        {/* Row 3 - New Widgets */}
        <Grid item xs={12} sm={6} md={4}>
          <CircularGaugeCard
            title="Compliance Score"
            value={88}
            color="info"
            icon={GavelIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Policy Violations"
            value={7}
            unit="violations"
            color="warning"
            trend="↑ 1 this month"
            icon={WarningIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Regulatory Changes"
            value={12}
            unit="changes"
            color="secondary"
            trend="↑ 3 new"
            icon={ChangeCircleIcon}
          />
        </Grid>

        {/* Quick Stats - Now takes full width */}
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              System Health
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'API Response Time', value: '124ms', status: 'good' },
                { label: 'Data Sync Status', value: 'Real-time', status: 'good' },
                { label: 'Model Accuracy', value: '94.2%', status: 'good' },
                { label: 'System Uptime', value: '99.98%', status: 'good' },
              ].map((stat, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">{stat.label}</Typography>
                  <Chip
                    label={stat.value}
                    size="small"
                    color={stat.status === 'good' ? 'success' : 'warning'}
                    variant="filled"
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Chatbot Section */}
        <Grid item xs={12} md={6} sx={{ position: 'fixed', bottom: theme.spacing(3), right: theme.spacing(3), zIndex: 1300 }}>
          <Card sx={{ p: 2, width: 300, height: 400, display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SmartToyIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                AI Governance Assistant
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                bgcolor: '#F9FAFB',
                borderRadius: 1,
                p: 1.5,
                mb: 1.5,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {chat.map((msg, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper
                    sx={{
                      p: 1,
                      maxWidth: '85%',
                      bgcolor: msg.type === 'user' ? 'primary.main' : 'white',
                      color: msg.type === 'user' ? 'white' : 'text.primary',
                      borderRadius: 1.5,
                      fontSize: '0.8rem',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{msg.text}</Typography>
                    {msg.metadata && (
                      <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {msg.metadata.actions.map((action, i) => (
                          <Chip
                            key={i}
                            label={action}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.6rem',
                              height: 'auto',
                              '& .MuiChip-label': {
                                py: '2px',
                              },
                              color: msg.type === 'user' ? 'white' : 'primary.main',
                              borderColor: msg.type === 'user' ? 'white' : 'primary.main',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Paper>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 }, fontSize: '0.8rem' }}
                inputProps={{ style: { fontSize: '0.8rem', padding: '8px 12px' } }}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{ borderRadius: 1.5, minWidth: '36px', p: 0.8 }}
              >
                <SendIcon sx={{ fontSize: '1.2rem' }} />
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}