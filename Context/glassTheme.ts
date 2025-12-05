// src/theme/glassTheme.ts
import { createTheme } from '@mui/material/styles';

const glassTheme = createTheme({
    palette: {
        mode: 'dark', // Base escura conforme Brand Book provável
        primary: { main: '#00f2ff' }, // Neon Blue
        background: {
            default: '#0a0a0a',
            paper: 'rgba(255, 255, 255, 0.05)', // Base do vidro
        },
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
    },
});

export default glassTheme;