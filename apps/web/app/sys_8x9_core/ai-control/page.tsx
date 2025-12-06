'use client';

import { Typography, Paper } from '@mui/material';

export default function AiControlPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4">AI Control</Typography>
      <Typography paragraph>
        This is the AI Control page. Here you will be able to manage the
        settings for the AI that generates blog content.
      </Typography>
      {/* TODO: Implement AI control functionality */}
    </Paper>
  );
}
