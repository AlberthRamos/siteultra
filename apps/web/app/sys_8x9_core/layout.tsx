'use client';

import { ReactNode } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;

const crmSections = [
  { text: 'Dashboard', href: '/sys_8x9_core' },
  { text: 'Users', href: '/sys_8x9_core/users' },
  { text: 'CMS', href: '/sys_8x9_core/cms' },
  { text: 'AI Control', href: '/sys_8x9_core/ai-control' },
];

export default function CrmLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            CRM Admin
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {crmSections.map((section) => (
              <ListItem key={section.text} disablePadding>
                <ListItemButton component={Link} href={section.href}>
                  <ListItemText primary={section.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
