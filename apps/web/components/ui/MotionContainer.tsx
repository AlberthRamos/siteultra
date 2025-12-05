'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Box, BoxProps } from '@mui/material'

interface MotionContainerProps extends BoxProps {
    children: ReactNode
    delay?: number
    stagger?: number
}

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: (props: { delay: number; stagger: number }) => ({
        opacity: 1,
        transition: {
            delayChildren: props.delay,
            staggerChildren: props.stagger,
        },
    }),
}

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
        },
    },
}

export function MotionContainer({ children, delay = 0, stagger = 0.1, ...props }: MotionContainerProps) {
    return (
        <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={{ delay, stagger }}
            {...props}
        >
            {children}
        </Box>
    )
}

export function MotionItem({ children, ...props }: BoxProps) {
    return (
        <Box component={motion.div} variants={itemVariants} {...props}>
            {children}
        </Box>
    )
}
