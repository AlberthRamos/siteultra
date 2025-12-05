import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { Box } from '@mui/material'

export const metadata: Metadata = {
    title: 'Ultra Systems - Inteligência Tributária e Cibersegurança',
    description: 'Plataforma de recuperação tributária e segurança ofensiva',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body>
                <Providers>
                    <Box sx={{
                        minHeight: '100vh',
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {children}
                    </Box>
                </Providers>
            </body>
        </html>
    )
}
