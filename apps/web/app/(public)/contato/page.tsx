'use client'

import { useState } from 'react'
import { Box, Container, Typography, Paper, TextField, Button, Grid, MenuItem, Alert } from '@mui/material'
import { Mail, Send } from 'lucide-react'

export default function ContatoPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // TODO: Integrar com backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' })
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 8 }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Mail size={64} color="#00f2ff" style={{ margin: '0 auto 24px' }} />
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        Fale Conosco
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Solicite uma análise gratuita ou tire suas dúvidas
                    </Typography>
                </Box>

                {/* Form */}
                <Paper sx={{ p: 4 }}>
                    {submitted && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            Mensagem enviada com sucesso! Entraremos em contato em breve.
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Nome Completo"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    type="email"
                                    label="E-mail"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Telefone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Empresa"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    select
                                    label="Serviço de Interesse"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="ultra-tax">Ultra Tax - Recuperação Tributária</MenuItem>
                                    <MenuItem value="ultra-security">Ultra Security - Pentest/Red Team</MenuItem>
                                    <MenuItem value="both">Ambos os Serviços</MenuItem>
                                    <MenuItem value="other">Outro</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Mensagem"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Conte-nos mais sobre sua necessidade..."
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                    endIcon={<Send />}
                                >
                                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {/* Info */}
                <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Ou entre em contato diretamente:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        contato@ultrasystems.com.br
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}
