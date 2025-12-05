'use client';

import { Typography, Paper } from '@mui/material';

export default function CmsPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4">Content Management</Typography>
      <Typography paragraph>
        This is the CMS page. Here you will be able to manage the content of the
        institutional website.
      </Typography>
      {/* TODO: Implement CMS functionality */}
    </Paper>
  );
}
