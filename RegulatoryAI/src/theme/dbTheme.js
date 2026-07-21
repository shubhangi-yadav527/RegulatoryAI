import { createTheme } from '@mui/material/styles';

export const dbTheme = createTheme({
  palette: {
    primary: {
      main: '#0018A8', // Deutsche Bank deep blue
      light: '#3B82F6',
      dark: '#0A136B',
    },
    secondary: {
      main: '#0D9488', // Rich Vivid Teal
      light: '#14B8A6',
      dark: '#0F766E',
    },
    success: {
      main: '#059669', // Deep Emerald Green for high compliance contrast
      light: '#10B981',
      dark: '#047857',
    },
    warning: {
      main: '#D97706', // Rich Vivid Amber for risk contrast
      light: '#F59E0B',
      dark: '#B45309',
    },
    error: {
      main: '#DC2626', // Deep Crimson Red for high risk contrast
      light: '#EF4444',
      dark: '#991B1B',
    },
    background: {
      default: '#F1F5F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A', // Ultra crisp Slate 900 dark text
      secondary: '#475569', // Clear Slate 600 secondary text
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ...Array(24).fill('0 25px 50px -12px rgba(0, 0, 0, 0.25)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
        },
        contained: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5FA', // Soft White/Light Grey for card background
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)', // Keeping existing shadow, as no new one provided
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Frosted glass effect
          backdropFilter: 'blur(10px)', // Glassmorphism blur effect
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A2E', // Dark Navy for panel header/sidebar background
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});