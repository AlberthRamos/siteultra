import { Box, Container, Grid, Typography, IconButton } from '@mui/material'
import { Facebook, Twitter, Linkedin, Instagram, Shield } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
    return (
        <Box sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            bgcolor: '#050505',
            pt: 8,
            pb: 4
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Shield size={24} color="#00f2ff" />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Ultra Systems</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 300 }}>
                            Inteligência tributária e cibersegurança ofensiva para proteger e escalar o seu negócio.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#00f2ff' } }}>
                                <Linkedin size={20} />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#00f2ff' } }}>
                                <Instagram size={20} />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#00f2ff' } }}>
                                <Twitter size={20} />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Soluções</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/ultra-tax" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Ultra Tax</Link>
                            <Link href="/ultra-security" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Ultra Security</Link>
                            <Link href="/portal" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Portal do Cliente</Link>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Empresa</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/sobre" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Sobre Nós</Link>
                            <Link href="/blog" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Blog</Link>
                            <Link href="/carreiras" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Carreiras</Link>
                            <Link href="/contato" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Contato</Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Legal</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/privacidade" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Política de Privacidade</Link>
                            <Link href="/termos" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>Termos de Uso</Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} Ultra Systems. Todos os direitos reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}
