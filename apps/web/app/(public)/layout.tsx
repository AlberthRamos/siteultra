'use client';

import { ReactNode } from 'react';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ultra Systems
          </Typography>
          <Button onClick={toggleTheme} variant="outlined" color="primary">
            Toggle Theme ({theme})
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Box>
  );
}
