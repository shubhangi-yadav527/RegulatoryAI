import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { dbTheme } from "./theme/dbTheme";
import TopBar from "./components/TopBar";

// Pages
import HomeDashboard from "./pages/HomeDashboard";
import RegulatoryIntelligence from "./pages/RegulatoryIntelligence";
import DepartmentImpact from "./pages/DepartmentImpact";
import EnterpriseRiskDashboard from "./pages/EnterpriseRiskDashboard";
import CarbonDashboard from "./pages/CarbonDashboard";
import CostROIDashboard from "./pages/CostROIDashboard";
import ExecutiveApproval from "./pages/ExecutiveApproval";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Box
      className={isHomePage ? "home-dashboard-wrapper" : ""}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        // Only apply bgcolor for non-home pages to avoid conflict with home-dashboard-wrapper
        // For home page, ensure it's transparent to let the wrapper's gradient show
        bgcolor: isHomePage ? "transparent" : "background.default",
      }}
    >
      {!isHomePage && <TopBar userName="Sarah Chen" />}
      <Box sx={{ flex: 1, bgcolor: isHomePage ? "transparent" : "inherit" }}>
        {" "}
        {/* Ensure this inner Box is also transparent */}
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/risks" element={<EnterpriseRiskDashboard />} />
          <Route path="/esg" element={<CarbonDashboard />} />
          <Route path="/ai" element={<RegulatoryIntelligence />} />
          <Route path="/approval" element={<ExecutiveApproval />} />
          <Route path="/departments" element={<DepartmentImpact />} />
          <Route path="/roi" element={<CostROIDashboard />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={dbTheme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
