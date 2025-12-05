'use client';

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Shield, TrendingUp, Home, Info, Mail, Phone } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Início', href: '/', icon: <Home /> },
    { name: 'UltraTax', href: '/ultra-tax', icon: <TrendingUp /> },
    { name: 'UltraSecurity', href: '/ultra-security', icon: <Shield /> },
    { name: 'Sobre', href: '/sobre', icon: <Info /> },
    { name: 'Contato', href: '/contato', icon: <Mail /> },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', background: 'linear-gradient(45deg, #00f2ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Ultra Systems
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              component={Link} 
              href={item.href}
              onClick={handleDrawerToggle}
              selected={pathname === item.href}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 242, 255, 0.1)',
                  borderLeft: '3px solid #00f2ff',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.icon}
                <ListItemText primary={item.name} />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        component="nav" 
        position="fixed"
        sx={{
          background: scrolled 
            ? 'rgba(10, 10, 15, 0.95)' 
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : 'none',
          transition: 'all 0.3s ease-in-out',
          borderBottom: scrolled 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : 'none'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                flexGrow: { xs: 1, md: 0 },
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                background: 'linear-gradient(45deg, #00f2ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7c3aed, #00f2ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              }}
            >
              Ultra Systems
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: pathname === item.href ? '#00f2ff' : 'white',
                      fontWeight: pathname === item.href ? 'bold' : 'normal',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -2,
                        left: '50%',
                        width: pathname === item.href ? '100%' : '0',
                        height: 2,
                        background: 'linear-gradient(45deg, #00f2ff, #7c3aed)',
                        transform: 'translateX(-50%)',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                      '&:hover': {
                        color: '#00f2ff',
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          background: 'rgba(10, 10, 15, 0.9)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          py: 6,
          mt: 'auto'
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
            gap: 4,
            mb: 4 
          }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00f2ff' }}>
                Ultra Systems
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Soluções completas em Inteligência Tributária e Cibersegurança Ofensiva para empresas que buscam excelência e proteção.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00f2ff' }}>
                Produtos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/ultra-tax" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: '#00f2ff' } }}>
                    UltraTax - Inteligência Tributária
                  </Typography>
                </Link>
                <Link href="/ultra-security" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: '#00f2ff' } }}>
                    UltraSecurity - Cibersegurança
                  </Typography>
                </Link>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00f2ff' }}>
                Contato
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: '#00f2ff' }} />
                  <Typography variant="body2" color="text.secondary">
                    (11) 9999-9999
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Mail sx={{ fontSize: 16, color: '#00f2ff' }} />
                  <Typography variant="body2" color="text.secondary">
                    contato@ultrasystems.com.br
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            pt: 3, 
            textAlign: 'center' 
          }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 Ultra Systems. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;