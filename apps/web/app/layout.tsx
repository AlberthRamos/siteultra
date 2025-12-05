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
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Geologica:wght@700&family=Inter:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
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
