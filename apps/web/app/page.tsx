import { Box, Typography, Container } from '@mui/material'

export default function HomePage() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Ultra Systems
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Inteligência Tributária e Cibersegurança Ofensiva
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, maxWidth: 600 }}>
                    Plataforma em desenvolvimento - Fase 1: Setup Next.js 14 concluído
                </Typography>
            </Box>
        </Container>
    )
}
