import { createTheme } from '@mui/material/styles';

// Ultra Security Theme
export const securityTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F0FF', // Neon Cyan
    },
    secondary: {
      main: '#007BFF', // Electric Blue
    },
    background: {
      default: '#050505',
      paper: 'rgba(5, 5, 5, 0.6)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
  },
  typography: {
    fontFamily: '"Geologica", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.05em',
    },
    h2: {
        fontWeight: 600,
        fontSize: '2rem',
        letterSpacing: '0.05em',
    },
    body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #00F0FF',
          borderRadius: 0,
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #00F0FF',
          '&:hover': {
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.8)',
          },
        },
      },
    },
  },
});

// Ultra Tax Theme
export const taxTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D4AF37', // Gold/Bronze
    },
    secondary: {
      main: '#000080', // Royal Blue
    },
    background: {
      default: '#F8FAFC',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#0F172A',
      secondary: '#334155',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
          fontWeight: 600,
          fontSize: '2rem',
      },
      body1: {
          fontSize: '1rem',
          lineHeight: 1.6,
      },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});
