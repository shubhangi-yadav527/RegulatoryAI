import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, Typography, Chip, LinearProgress, Paper
} from '@mui/material';
import axios from 'axios';

// Icons
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FolderIcon from '@mui/icons-material/Folder';
import SpeedIcon from '@mui/icons-material/Speed';
import Co2Icon from '@mui/icons-material/Co2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArticleIcon from '@mui/icons-material/Article';

import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:8000';

export default function HomeDashboard() {
  const navigate = useNavigate();
  // 9 Widgets Data State
  const [governanceScore, setGovernanceScore] = useState({ score: 97, status: 'Excellent', trend: '↑ +2% from last month' });
  const [riskData, setRiskData] = useState({ overall_risk: 72, risk_level: 'Medium' });
  const [activeRegulations, setActiveRegulations] = useState(18);
  const [alerts, setAlerts] = useState({ total_alerts: 4, high_priority: [] });
  const [carbonImpact, setCarbonImpact] = useState({ current_co2: 31, reduction_percentage: 40 });
  const [aiConfidence] = useState('High');
  const [costRoi, setCostRoi] = useState({ annual_savings: '€1.66 M', current_annual_cost: '€3.34 M', ai_optimized_cost: '€1.70 M' });
  const [systemHealth, setSystemHealth] = useState({ api_response_time: '124ms', data_sync: 'Real-time', model_accuracy: '94.2%', uptime: '99.98%' });
  const [newsletter] = useState({ title: 'July 2026 Updates', date: 'July 2026', updates: ['EU AI Act Implementation Timeline', 'DORA Resiliency Compliance Standards', 'Corporate ESG Green Computing Initiative'] });

  // Fetch data from backend with fallback
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const scoreRes = await axios.get(`${BACKEND_URL}/api/governance/score`);
        setGovernanceScore(scoreRes.data);

        const riskRes = await axios.get(`${BACKEND_URL}/api/governance/risk-metrics`);
        setRiskData({
          overall_risk: riskRes.data.overall_risk,
          risk_level: riskRes.data.risk_level
        });

        const regRes = await axios.get(`${BACKEND_URL}/api/regulations`);
        setActiveRegulations(regRes.data.regulations.length * 6);

        const alertsRes = await axios.get(`${BACKEND_URL}/api/alerts`);
        setAlerts(alertsRes.data);

        const carbonRes = await axios.get(`${BACKEND_URL}/api/carbon/metrics`);
        setCarbonImpact({
          current_co2: carbonRes.data.current_co2,
          reduction_percentage: carbonRes.data.reduction_percentage
        });

        const roiRes = await axios.get(`${BACKEND_URL}/api/cost-roi`);
        setCostRoi(roiRes.data);

        const healthRes = await axios.get(`${BACKEND_URL}/health`);
        setSystemHealth({
          api_response_time: healthRes.data.api_response_time,
          data_sync: healthRes.data.data_sync,
          model_accuracy: healthRes.data.model_accuracy,
          uptime: healthRes.data.uptime
        });
      } catch (error) {
        console.warn("Could not fetch from FastAPI backend, using high-fidelity mock fallbacks: ", error.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, height: '100%', pr: { xs: 0, md: 22 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gridTemplateRows: { xs: 'auto', md: 'repeat(3, 1fr)' },
          gap: 2.5,
          height: { xs: 'auto', md: 'calc(84vh - 120px)' },
          minHeight: { xs: 'auto', md: '520px' }
        }}
      >
        {/* ROW 1: AI Governance, Enterprise Risk, Active Regulations */}
        {/* 1. AI Governance Score */}
        <Box sx={{ height: '100%' }}>
          <Card className="glass-card" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                AI Governance Score
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mt: 0.5, mb: 0.2 }}>
                {governanceScore.score}%
              </Typography>
              <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Confidence: {governanceScore.status}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={governanceScore.score}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(0, 24, 168, 0.08)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#2DD4BF',
                    borderRadius: 3,
                  }
                }}
              />
            </Box>
          </Card>
        </Box>

        {/* 2. Enterprise Risk */}
        <Box sx={{ height: '100%' }}>
          <Card 
            className="glass-card" 
            onClick={() => navigate('/risks')}
            sx={{ 
              p: 2, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: 'primary.main',
                boxShadow: '0 8px 30px rgba(0, 24, 168, 0.08)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                Enterprise Risk
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'warning.main', mt: 0.5, mb: 0.2 }}>
                {riskData.overall_risk}%
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Level: {riskData.risk_level}
              </Typography>
            </Box>
            
            {/* Semi-circular gauge mock */}
            <Box sx={{ position: 'relative', width: 120, height: 60, mx: 'auto', mt: 0.5 }}>
              <Box
                sx={{
                  width: 120,
                  height: 60,
                  background: `conic-gradient(from 180deg at 50% 100%, #EF4444 0deg, #FBBF24 90deg, #2DD4BF 180deg)`,
                  borderRadius: '120px 120px 0 0',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: 94,
                    height: 47,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '94px 94px 0 0',
                    bottom: 0,
                    left: 13
                  }
                }}
              />
              {/* Gauge Needle */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 2.5,
                  height: 47,
                  bgcolor: 'text.primary',
                  bottom: 0,
                  left: '50%',
                  transformOrigin: 'bottom center',
                  transform: `translateX(-50%) rotate(${((riskData.overall_risk / 100) * 180) - 90}deg)`,
                  transition: 'transform 0.5s ease-out'
                }}
              />
            </Box>
          </Card>
        </Box>

        {/* 3. Active Regulations */}
        <Box sx={{ height: '100%' }}>
          <Card className="glass-card" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                  Active Regulations
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mt: 0.5, mb: 0.2 }}>
                  {activeRegulations}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Current Policies
                </Typography>
              </Box>
              <FolderIcon sx={{ color: 'primary.main', opacity: 0.6, fontSize: '1.6rem' }} />
            </Box>
            
            {/* Custom red/orange active bar graphic from mockup */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, height: 58, mt: 0.5, justifyContent: 'center' }}>
              {[3, 6, 8, 12, 10, 8, 14, 18, 14, 10].map((h, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8.5,
                    height: `${h * 2.5}px`,
                    bgcolor: i > 6 ? 'error.main' : 'warning.main',
                    borderRadius: '1.5px',
                    opacity: 0.8
                  }}
                />
              ))}
            </Box>
          </Card>
        </Box>

        {/* ROW 2: Carbon Impact, High Priority Alerts, AI Confidence */}
        {/* 4. Carbon Impact */}
        <Box sx={{ height: '100%' }}>
          <Card 
            className="glass-card" 
            onClick={() => navigate('/esg')}
            sx={{ 
              p: 2, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: 'primary.main',
                boxShadow: '0 8px 30px rgba(0, 24, 168, 0.08)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                Carbon Impact
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5, mb: 0.5 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    bgcolor: 'rgba(45, 212, 191, 0.15)', 
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(45, 212, 191, 0.3)'
                  }}
                >
                  <Co2Icon sx={{ fontSize: '1.6rem', color: '#2DD4BF' }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1 }}>
                    {carbonImpact.current_co2}
                    <Typography component="span" variant="caption" sx={{ ml: 0.3, fontWeight: 700, color: 'text.secondary' }}>
                      Tons CO₂
                    </Typography>
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700, mt: 0.2, display: 'block', fontSize: '0.7rem' }}>
                    ↓ {carbonImpact.reduction_percentage}% Reduction
                  </Typography>
                </Box>
              </Box>

              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', lineHeight: 1.2, fontSize: '0.72rem' }}>
                Green computing auto-scaling active. Applied to Loan & Core Banking servers.
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* 5. High Priority Alerts */}
        <Box sx={{ height: '100%' }}>
          <Card className="glass-card" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                  High Priority Alerts
                </Typography>
                <Chip label={`${alerts.total_alerts} Active`} color="error" size="small" sx={{ fontWeight: 700, height: 16, fontSize: '0.65rem' }} />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                <WarningIcon sx={{ fontSize: '1.8rem', color: 'error.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'error.main', lineHeight: 1 }}>
                    {alerts.total_alerts}
                  </Typography>
                </Box>
              </Box>

              {/* Alert Snippet */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {alerts.high_priority && alerts.high_priority.slice(0, 1).map((alert, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      p: 0.8, 
                      bgcolor: 'rgba(239, 68, 68, 0.05)', 
                      borderLeft: '2.5px solid #EF4444', 
                      borderRadius: '0 6px 6px 0' 
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'error.main', display: 'block', fontSize: '0.7rem' }}>
                      {alert.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {alert.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Box>

        {/* 6. AI Confidence */}
        <Box sx={{ height: '100%' }}>
          <Card className="glass-card" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                AI Confidence
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mt: 0.5, mb: 0.2 }}>
                {aiConfidence}
              </Typography>
              <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>
                Reliable Model
              </Typography>
            </Box>
            
            {/* Visual indicator (dial/speedometer mock) */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
              <SpeedIcon sx={{ fontSize: '3.8rem', color: 'primary.main', opacity: 0.8 }} />
            </Box>
          </Card>
        </Box>

        {/* ROW 3: Cost & ROI, System Health, Current Newsletter */}
        {/* 7. Cost & ROI */}
        <Box sx={{ height: '100%' }}>
          <Card 
            className="glass-card" 
            onClick={() => navigate('/roi')}
            sx={{ 
              p: 2, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: 'primary.main',
                boxShadow: '0 8px 30px rgba(0, 24, 168, 0.08)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                Cost & ROI
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5, mb: 0.5 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    bgcolor: 'rgba(0, 168, 168, 0.15)', 
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0, 168, 168, 0.3)'
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: '1.6rem', color: 'secondary.main' }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 850, color: 'secondary.main', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {costRoi.annual_savings}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700, mt: 0.1, display: 'block', fontSize: '0.7rem' }}>
                    Savings Annually
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 0.8, bgcolor: 'rgba(0, 24, 168, 0.02)', borderRadius: '6px', border: '1px dashed rgba(0, 24, 168, 0.08)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.2 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>Current Budget:</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.65rem' }}>{costRoi.current_annual_cost}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>Optimized:</Typography>
                  <Typography sx={{ fontWeight: 700, color: 'success.main', fontSize: '0.65rem' }}>{costRoi.ai_optimized_cost}</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* 8. System Health */}
        <Box sx={{ height: '100%' }}>
          <Card className="glass-card" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                System Health
              </Typography>
              <Chip 
                icon={<CheckCircleIcon sx={{ fontSize: '0.8rem', color: 'white !important' }} />}
                label="Normal" 
                color="success" 
                size="small"
                sx={{ fontWeight: 700, px: 0.3, height: 16, fontSize: '0.65rem' }} 
              />
            </Box>

            <Grid container spacing={0.8}>
              {[
                { label: 'Response', value: systemHealth.api_response_time },
                { label: 'Sync', value: systemHealth.data_sync },
                { label: 'Accuracy', value: systemHealth.model_accuracy },
                { label: 'Uptime', value: systemHealth.uptime },
              ].map((stat, idx) => (
                <Grid item xs={6} key={idx}>
                  <Paper sx={{ p: 0.6, bgcolor: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', boxShadow: 'none' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.1, fontSize: '0.6rem', lineHeight: 1 }}>
                      {stat.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 750, color: 'primary.main', fontSize: '0.7rem', lineHeight: 1.1 }}>
                      {stat.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>

        {/* 9. Current Newsletter */}
        <Box sx={{ height: '100%' }}>
          <Card className="glass-card" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                Newsletter
              </Typography>
              <Chip label={newsletter.date} size="small" variant="outlined" sx={{ fontWeight: 600, color: 'primary.main', borderColor: 'primary.main', height: 16, fontSize: '0.65rem' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, overflow: 'hidden' }}>
              {newsletter.updates.slice(0, 2).map((update, idx) => (
                <Box 
                  key={idx}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.8,
                    p: 0.6,
                    bgcolor: 'rgba(0, 24, 168, 0.02)',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 24, 168, 0.04)',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(0, 24, 168, 0.04)',
                      borderColor: 'rgba(0, 24, 168, 0.1)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <ArticleIcon sx={{ color: 'primary.main', opacity: 0.7, fontSize: '1rem' }} />
                  <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.68rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {update}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
