import { createTheme } from '@mui/material/styles'

// Tema baseado em Context/glassTheme.ts com Glassmorphism
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00f2ff', // Neon Blue (Brand)
        },
        secondary: {
            main: '#7c3aed', // Purple
        },
        background: {
            default: '#0a0a0a',
            paper: 'rgba(255, 255, 255, 0.05)',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(16px)',
                    backgroundColor: 'rgba(18, 18, 28, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    borderRadius: '16px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: '0 4px 14px 0 rgba(0, 242, 255, 0.39)',
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(0, 242, 255, 0.5)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(16px)',
                    backgroundColor: 'rgba(18, 18, 28, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                },
            },
        },
    },
})

export default theme
