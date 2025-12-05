'use client'

import { AppBar, Toolbar, Typography, Button, Box, Container, useScrollTrigger } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield } from 'lucide-react'

export function Navbar() {
    const pathname = usePathname()
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    })

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Ultra Tax', href: '/ultra-tax' },
        { label: 'Ultra Security', href: '/ultra-security' },
        { label: 'Contato', href: '/contato' },
    ]

    return (
        <AppBar
            position="fixed"
            elevation={trigger ? 4 : 0}
            sx={{
                background: trigger ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
                backdropFilter: trigger ? 'blur(12px)' : 'none',
                borderBottom: trigger ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ height: 80 }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #00f2ff 0%, #7c3aed 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Shield size={24} color="#fff" />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                            Ultra Systems
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Desktop Nav */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Button
                                    key={item.href}
                                    component={Link}
                                    href={item.href}
                                    sx={{
                                        color: isActive ? '#00f2ff' : 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: isActive ? 600 : 400,
                                        '&:hover': {
                                            color: '#fff',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            )
                        })}
                    </Box>

                    <Box sx={{ ml: 2 }}>
                        <Button
                            variant="outlined"
                            component={Link}
                            href="/portal"
                            sx={{
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                '&:hover': {
                                    borderColor: '#fff',
                                    background: 'rgba(255, 255, 255, 0.05)'
                                }
                            }}
                        >
                            Área do Cliente
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
