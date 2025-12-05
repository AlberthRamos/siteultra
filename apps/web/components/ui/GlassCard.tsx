'use client'

import { Paper, PaperProps, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps extends PaperProps {
    children: ReactNode
    hoverEffect?: boolean
}

export function GlassCard({ children, hoverEffect = true, sx, ...props }: GlassCardProps) {
    const theme = useTheme()

    return (
        <Paper
            component={motion.div}
            elevation={0}
            whileHover={hoverEffect ? {
                y: -8,
                boxShadow: `0 20px 40px -10px ${theme.palette.primary.main}40`,
                borderColor: theme.palette.primary.main
            } : undefined}
            transition={{ type: 'spring', stiffness: 300 }}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                p: 4,
                ...sx,
            }}
            {...props}
        >
            {/* Glow effect on hover */}
            {hoverEffect && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: `linear-gradient(180deg, ${theme.palette.primary.main}10 0%, transparent 100%)`,
                        opacity: 0,
                        zIndex: -1,
                    }}
                    whileHover={{ opacity: 1 }}
                />
            )}
            {children}
        </Paper>
    )
}
