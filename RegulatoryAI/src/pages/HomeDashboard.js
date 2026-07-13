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
        <Grid item xs={12} sm={6} md={3}>
          <CircularGaugeCard
            title="AI Governance Score"
            value={97}
            color="success"
            icon={SmartToyIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SemiCircularGaugeCard
            title="Enterprise Risk Gauge"
            value={72}
            status="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Active Regulations"
            value={18}
            unit="regulations"
            color="primary"
            icon={BuildIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="High Priority Alerts"
            value={4}
            unit="alerts"
            color="error"
            trend="↑ 2 this week"
          />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
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

        {/* Chatbot Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SmartToyIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                AI Governance Assistant
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                bgcolor: '#F9FAFB',
                borderRadius: 1,
                p: 2,
                mb: 2,
                maxHeight: '300px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {chat.map((msg, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: '75%',
                      bgcolor: msg.type === 'user' ? 'primary.main' : 'white',
                      color: msg.type === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    {msg.metadata && (
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {msg.metadata.actions.map((action, i) => (
                          <Chip
                            key={i}
                            label={action}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.7rem',
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
                placeholder="Ask about regulations, risks, or recommendations..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{ borderRadius: 2, minWidth: '44px', p: 1 }}
              >
                <SendIcon />
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={6}>
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
      </Grid>
    </Container>
  );
}
