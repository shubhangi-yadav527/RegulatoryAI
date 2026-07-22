import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { KPICard } from "../components/KPICards";

export default function CarbonDashboard() {
  const theme = useTheme();

  const monthlyData = [
    { month: "Jan", co2: 38 },
    { month: "Feb", co2: 36 },
    { month: "Mar", co2: 34 },
    { month: "Apr", co2: 32 },
    { month: "May", co2: 30 },
    { month: "Jun", co2: 31 },
  ];

  const departmentEmissions = [
    { name: "Core Banking", value: 42 },
    { name: "Loans", value: 35 },
    { name: "Deposits", value: 23 },
  ];

  const COLORS = [
    theme.palette.success.main,
    theme.palette.secondary.main,
    theme.palette.success.light,
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Carbon & Sustainability Dashboard
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Track environmental impact and AI-driven optimization recommendations
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <VerifiedIcon
                sx={{ fontSize: "1.5rem", color: "success.main" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Current CO₂
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              31 Tons
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Monthly baseline
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <WarningAmberIcon
                sx={{ fontSize: "1.5rem", color: "secondary.main" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                AI Optimized
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "success.main" }}
            >
              18.6 Tons
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              40% reduction
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <VerifiedIcon
                sx={{ fontSize: "1.5rem", color: "success.light" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Carbon Saved
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "success.main" }}
            >
              12.4 Tons
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Annual impact
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <VerifiedIcon
                sx={{ fontSize: "1.5rem", color: "primary.main" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Tree Equivalent
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              2,054
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Trees to offset
            </Typography>
          </Card>
        </Grid>

        {/* Monthly Trend Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Monthly CO₂ Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="co2"
                  stroke={theme.palette.success.main}
                  strokeWidth={3}
                  dot={{ fill: theme.palette.success.main, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Department Emissions Pie */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Emissions by Department
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentEmissions}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentEmissions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              🤖 Green Recommendations
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              {[
                {
                  title: "Optimize Data Center Operations",
                  impact: "~4.2 Tons CO₂/year",
                  status: "High Impact",
                },
                {
                  title: "Implement Cloud Auto-Scaling",
                  impact: "~3.8 Tons CO₂/year",
                  status: "Medium Impact",
                },
                {
                  title: "Reduce Compliance Report Frequency",
                  impact: "~2.1 Tons CO₂/year",
                  status: "Quick Win",
                },
                {
                  title: "Adopt Sustainable Vendors",
                  impact: "~2.3 Tons CO₂/year",
                  status: "Strategic",
                },
              ].map((rec, i) => (
                <Card
                  key={i}
                  sx={{
                    p: 2,
                    bgcolor: "success.50",
                    borderLeft: `4px solid ${theme.palette.success.main}`,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {rec.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block", mb: 1 }}
                  >
                    Potential: {rec.impact}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "success.light",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: 600,
                    }}
                  >
                    {rec.status}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
