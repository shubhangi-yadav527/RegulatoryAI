import React, { useState, useEffect } from 'react';
import {
  Box, Card, Typography, useTheme,
} from '@mui/material';
import { ProgressCard } from '../components/KPICards';

const BACKEND_URL = 'http://localhost:8000';

export default function EnterpriseRiskDashboard() {
  const theme = useTheme();

  const [riskData, setRiskData] = useState({
    overall_risk: 72,
    risk_level: 'Medium',
    categories: [
      { category: 'Compliance Risk', percentage: 28, color: 'error' },
      { category: 'Operational Risk', percentage: 45, color: 'warning' },
      { category: 'Cyber Risk', percentage: 35, color: 'error' },
      { category: 'FSG Risk', percentage: 52, color: 'warning' },
      { category: 'Model Risk', percentage: 38, color: 'warning' },
      { category: 'AI Explanation Risk', percentage: 22, color: 'success' },
    ]
  });

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        console.log('EnterpriseRiskDashboard: Fetching risk metrics from:', `${BACKEND_URL}/api/governance/risk-metrics`);
        const response = await fetch(`${BACKEND_URL}/api/governance/risk-metrics`);
        if (response.ok) {
          const data = await response.json();
          console.log('EnterpriseRiskDashboard: Received BQ data:', data);
          setRiskData(data);
        } else {
          console.error('EnterpriseRiskDashboard: API response error status:', response.status);
        }
      } catch (err) {
        console.error('EnterpriseRiskDashboard: Fetch error:', err);
      }
    };
    fetchRiskData();
  }, []);

  const getRiskColor = (level) => {
    const lvl = (level || '').toLowerCase();
    if (lvl === 'low') return theme.palette.success.main;
    if (lvl === 'high' || lvl === 'severe') return theme.palette.error.main;
    return theme.palette.warning.main;
  };

  const getRiskThemeName = (level) => {
    const lvl = (level || '').toLowerCase();
    if (lvl === 'low') return 'success';
    if (lvl === 'high' || lvl === 'severe') return 'error';
    return 'warning';
  };

  return (
    <Box sx={{ height: '100%', pr: { xs: 0, md: 22 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          gap: 2.5,
          height: { xs: 'auto', md: 'calc(84vh - 120px)' },
          minHeight: { xs: 'auto', md: '520px' }
        }}
      >
        {/* Column 1: Central Gauge + Summary */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
          {/* Central Risk Gauge */}
          <Card className="glass-card" sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
              Overall Risk Level
            </Typography>
            <Box
              sx={{
                width: 170,
                height: 170,
                borderRadius: '50%',
                background: `conic-gradient(${getRiskColor(riskData.risk_level)} 0deg ${riskData.overall_risk * 3.6}deg, rgba(0, 24, 168, 0.08) ${riskData.overall_risk * 3.6}deg 360deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: 146,
                  height: 146,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, color: `${getRiskThemeName(riskData.risk_level)}.main` }}>
                  {riskData.overall_risk}%
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.65rem' }}>
                  {riskData.risk_level}
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, fontWeight: 500, fontSize: '0.65rem' }}>
              Based on {riskData.categories.length} risk categories
            </Typography>
          </Card>

          {/* Detailed Analysis Summary */}
          <Card className="glass-card" sx={{ p: 2, height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', mb: 1, display: 'block' }}>
              Risk Analysis Summary
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
              {[
                { title: 'Critical', value: riskData.categories.filter(c => c.color === 'error').length.toString(), color: 'error' },
                { title: 'Medium', value: riskData.categories.filter(c => c.color === 'warning').length.toString(), color: 'warning' },
                { title: 'Low Priority', value: riskData.categories.filter(c => c.color === 'success').length.toString(), color: 'success' },
              ].map((item, i) => (
                <Box key={i} sx={{ p: 1, bgcolor: `${theme.palette[item.color].main}10`, borderRadius: 1.5, textAlign: 'center', border: `1px solid ${theme.palette[item.color].main}20` }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: theme.palette[item.color].main, fontSize: '0.85rem' }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.6rem', display: 'block', mt: 0.2 }}>
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Box>

        {/* Column 2: Categories + Trend */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
          {/* Risk Categories */}
          <Card className="glass-card" sx={{ p: 2, flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', mb: 1.5, display: 'block' }}>
              Risk Category Breakdown
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              {riskData.categories.map((risk, idx) => (
                <ProgressCard
                  key={idx}
                  title={risk.category}
                  percentage={risk.percentage}
                  color={risk.color}
                />
              ))}
            </Box>
          </Card>

          {/* Trend Analysis */}
          <Card className="glass-card" sx={{ p: 2, flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem', mb: 0.5, display: 'block' }}>
              Trend Analysis (Last 90 Days)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 60, justifyContent: 'center', my: 0.5 }}>
              {[65, 72, 68, 55, 48, 45, 42, 44, riskData.overall_risk].map((val, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    height: `${val}%`,
                    bgcolor: val > 60 ? theme.palette.error.main : val > 45 ? theme.palette.warning.main : theme.palette.success.main,
                    borderRadius: '2.5px 2.5px 0 0',
                    opacity: 0.8,
                    '&:hover': { opacity: 1 },
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textAlign: 'center', fontSize: '0.65rem', fontWeight: 500 }}>
              Risk level showing improvement trend
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
