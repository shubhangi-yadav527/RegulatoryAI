import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Card, Typography, TextField, Button, Chip, Paper, IconButton, useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';

export function ZehnBotChat({ isOpen, onClose }) {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m ZehnBot. How can I assist you today?',
      isQuestion: true,
    },
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
        actions: ['High Priority', 'Q3 2026 Deadline', 'Review Risk Assessment'],
      },
    },
  ]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = { type: 'user', text: message };
      setChat((prev) => [...prev, userMessage]);
      setMessage('');

      // Simulate bot response (replace with actual FastAPI call)
      setTimeout(() => {
        setChat((prev) => [...prev, {
          type: 'bot',
          text: 'Processing your query with AI governance engine...',
        }]);
        // Further simulate a detailed response after a delay
        setTimeout(() => {
          setChat((prev) => [...prev, {
            type: 'bot',
            text: 'Based on your query, the Digital Operational Resilience Act (DORA) requires enhanced cybersecurity measures and incident response planning across 2 departments, with an estimated cost of €1.2M.',
            metadata: {
              regulation: 'DORA',
              departments: ['IT Security', 'Operations'],
              cost: '€1.2M',
              actions: ['Enhance Cybersecurity', 'Incident Response Planning', 'Third-Party Risk Assessment'],
            },
          }]);
        }, 2000);
      }, 1000);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Card
      sx={{
        position: 'fixed',
        bottom: theme.spacing(10), // Above the FAB
        right: theme.spacing(3),
        width: 350,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[10],
        borderRadius: theme.shape.borderRadius,
        bgcolor: theme.palette.background.paper,
        zIndex: 1300,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyIcon sx={{ color: theme.palette.secondary.main, fontSize: '1.5rem' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', color: theme.palette.text.primary }}>
            ZehnBot AI Assistant
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: theme.palette.text.secondary }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          p: 1.5,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          bgcolor: theme.palette.background.default, // Use default background for chat area
        }}
      >
        {chat.map((msg, idx) => (
          <Box key={idx} sx={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
            <Paper
              sx={{
                p: 1,
                maxWidth: '85%',
                bgcolor: msg.type === 'user' ? theme.palette.secondary.main : theme.palette.background.paper,
                color: msg.type === 'user' ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                borderRadius: 1.5,
                fontSize: '0.8rem',
                boxShadow: theme.shadows[1],
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{msg.text}</Typography>
              {msg.metadata && (
                <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Object.entries(msg.metadata).map(([key, value], i) => {
                    if (key === 'actions' && Array.isArray(value)) {
                      return value.map((action, j) => (
                        <Chip
                          key={`${i}-${j}`}
                          label={action}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.6rem',
                            height: 'auto',
                            '& .MuiChip-label': { py: '2px' },
                            color: msg.type === 'user' ? theme.palette.secondary.contrastText : theme.palette.secondary.main,
                            borderColor: msg.type === 'user' ? theme.palette.secondary.contrastText : theme.palette.secondary.main,
                          }}
                        />
                      ));
                    }
                    return null;
                  })}
                </Box>
              )}
            </Paper>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1, p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask ZehnBot..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: 1.5, bgcolor: theme.palette.background.default },
            '& .MuiInputBase-input': { fontSize: '0.8rem', padding: '8px 12px', color: theme.palette.text.primary },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.secondary.main },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.secondary.main },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{ borderRadius: 1.5, minWidth: '36px', p: 0.8, bgcolor: theme.palette.secondary.main, '&:hover': { bgcolor: theme.palette.secondary.dark } }}
        >
          <SendIcon sx={{ fontSize: '1.2rem', color: theme.palette.secondary.contrastText }} />
        </Button>
      </Box>
    </Card>
  );
}