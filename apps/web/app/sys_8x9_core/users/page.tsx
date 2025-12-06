'use client';

import { Typography, Paper } from '@mui/material';

export default function UsersPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4">User Management</Typography>
      <Typography paragraph>
        This is the user management page. Here you will be able to add, edit, and
        remove users.
      </Typography>
      {/* TODO: Implement user table and actions */}
    </Paper>
  );
}
