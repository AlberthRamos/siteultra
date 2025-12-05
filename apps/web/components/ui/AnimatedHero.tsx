'use client'

import { Typography, Box, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AnimatedHeroProps {
    title: string
    subtitle: string
    description: string
    primaryCta: { label: string; href: string }
    secondaryCta?: { label: string; href: string }
}

export function AnimatedHero({ title, subtitle, description, primaryCta, secondaryCta }: AnimatedHeroProps) {
    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                py: 8,
                position: 'relative',
                zIndex: 1,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '3rem', md: '5rem' },
                        fontWeight: 800,
                        mb: 2,
                        background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {title}
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        maxWidth: 800,
                        background: 'linear-gradient(45deg, #00f2ff 30%, #7c3aed 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 600
                    }}
                >
                    {subtitle}
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
                <Typography variant="body1" sx={{ mb: 6, maxWidth: 600, color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    {description}
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                        component={Link}
                        href={primaryCta.href}
                        variant="contained"
                        size="large"
                        endIcon={<ArrowRight />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            background: 'linear-gradient(45deg, #00f2ff 30%, #00c2cc 90%)',
                            color: '#000'
                        }}
                    >
                        {primaryCta.label}
                    </Button>
                    {secondaryCta && (
                        <Button
                            component={Link}
                            href={secondaryCta.href}
                            variant="outlined"
                            size="large"
                            endIcon={<ArrowRight />}
                            sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderWidth: 2 }}
                        >
                            {secondaryCta.label}
                        </Button>
                    )}
                </Box>
            </motion.div>
        </Box>
    )
}
