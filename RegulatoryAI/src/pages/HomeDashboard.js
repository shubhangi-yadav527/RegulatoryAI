import React from 'react';
import { Box, Typography, IconButton, Avatar, Badge, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatbotIcon from '@mui/icons-material/SmartToy'; // Using SmartToy for chatbot

// Styled components for Glassmorphism
const GlassmorphicContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  borderRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  height: '90vh', // Adjust as needed
  width: '95vw', // Adjust as needed
  margin: 'auto',
  overflow: 'hidden',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '80px',
  backgroundColor: 'rgba(26, 26, 46, 0.8)', // Dark Navy from theme
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(3),
  gap: theme.spacing(3),
}));

const SidebarButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.light,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
}));

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(26, 26, 46, 0.6)', // Dark Navy from theme, slightly transparent
  padding: theme.spacing(1, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
}));

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: '20px',
  overflowY: 'auto',
});

const KPICard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white for cards
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const ChatbotWidget = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '30px',
  padding: theme.spacing(1, 2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  zIndex: 1000,
}));

export default function HomeDashboard() {
  return (
    <Box sx={{
      // Removed minHeight: '100vh' from here
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%', // Ensure it takes full width of its parent
      height: '100%', // Ensure it takes full height of its parent
    }}>
      <GlassmorphicContainer>
        {/* Sidebar */}
        <Sidebar>
          <SidebarButton className="active">
            <HomeIcon />
          </SidebarButton>
          <SidebarButton>
            <DashboardIcon />
          </SidebarButton>
          <SidebarButton>
            <DescriptionIcon />
          </SidebarButton>
          <SidebarButton>
            <AssignmentIcon />
          </SidebarButton>
          <SidebarButton>
            <SettingsIcon />
          </SidebarButton>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          <SidebarButton>
            <ExitToAppIcon />
          </SidebarButton>
        </Sidebar>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Header>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Deutsche Bank Logo/Icon Placeholder */}
              <Typography variant="h6" sx={{ fontWeight: 700, mr: 1 }}>DB</Typography>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>RegNet</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>European Regulatory AI</Typography>
              </Box>
            </Box>
            <Box>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Box>
          </Header>

          {/* KPI Cards Grid */}
          <MainContent>
            <Grid container spacing={3}>
              {/* Row 1: 4 Cards */}
              <Grid item xs={12} sm={6} md={3}>
                <KPICard>
                  <Typography variant="h4" color="primary">97%</Typography>
                  <Typography variant="subtitle2" color="text.secondary">AI Governance Score</Typography>
                  {/* Progress bar placeholder */}
                  <Box sx={{ height: 5, bgcolor: 'grey.300', borderRadius: 5, mt: 1 }}>
                    <Box sx={{ width: '97%', height: '100%', bgcolor: 'secondary.main', borderRadius: 5 }} />
                  </Box>
                </KPICard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <KPICard>
                  <Typography variant="h4" color="success">AI Altitude</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Confidence</Typography>
                  {/* Checkmark icon placeholder */}
                  <Box sx={{ mt: 1 }}><Typography variant="h3">✅</Typography></Box>
                </KPICard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <KPICard>
                  <Typography variant="h4" color="warning">72%</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Enterprise Risk</Typography>
                  {/* Speedometer gauge placeholder */}
                  <Box sx={{ mt: 1 }}><Typography variant="h3">📊</Typography></Box>
                </KPICard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <KPICard>
                  <Typography variant="h4" color="error">18</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Active Regulations</Typography>
                  {/* Bar chart placeholder */}
                  <Box sx={{ mt: 1 }}><Typography variant="h3">📈</Typography></Box>
                </KPICard>
              </Grid>

              {/* Row 2: 3 Cards */}
              <Grid item xs={12} sm={6} md={4}>
                <KPICard>
                  <Typography variant="h4" color="primary">9</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Recognal Changes</Typography>
                  {/* Icon placeholder */}
                  <Box sx={{ mt: 1 }}><Typography variant="h3">🔄</Typography></Box>
                </KPICard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <KPICard>
                  <Typography variant="h4" color="success">0</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Riexictind Security</Typography>
                  {/* Icon placeholder */}
                  <Box sx={{ mt: 1 }}><Typography variant="h3">🔒</Typography></Box>
                </KPICard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <KPICard>
                  <Typography variant="h4" color="error">4</Typography>
                  <Typography variant="subtitle2" color="text.secondary">High Priority Alerts</Typography>
                  {/* Warning triangle placeholder */}
                  <Box sx={{ mt: 1 }}><Typography variant="h3">⚠️</Typography></Box>
                </KPICard>
              </Grid>
            </Grid>
          </MainContent>
        </Box>
      </GlassmorphicContainer>

      {/* Floating Chatbot */}
      <ChatbotWidget>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, mr: 1 }}>
          <ChatbotIcon sx={{ color: 'white' }} />
        </Avatar>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
          Hello, I'm ZehnBot. How can I assist you?
        </Typography>
      </ChatbotWidget>
    </Box>
  );
}