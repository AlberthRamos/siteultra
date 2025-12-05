import { Box, Container, Typography, Grid, Button } from '@mui/material'
import { Shield, Target, Search, Users, Lock, AlertTriangle, FileSearch, Activity } from 'lucide-react'
import Link from 'next/link'
import { AnimatedHero } from '@/components/ui/AnimatedHero'
import { GlassCard } from '@/components/ui/GlassCard'
import { MotionContainer, MotionItem } from '@/components/ui/MotionContainer'

export const revalidate = 3600

const SECURITY_SERVICES = [
    {
        name: 'Pentest (Teste de Penetração)',
        icon: Target,
        description: 'Simulação de ataques reais para identificar vulnerabilidades em aplicações, redes e infraestrutura.',
        color: '#ef4444',
    },
    {
        name: 'Red Team',
        icon: Shield,
        description: 'Operações ofensivas completas simulando adversários reais para testar a capacidade de detecção e resposta.',
        color: '#7c3aed',
    },
    {
        name: 'Vulnerability Assessment',
        icon: Search,
        description: 'Varredura e análise sistemática de vulnerabilidades em ativos digitais.',
        color: '#f59e0b',
    },
    {
        name: 'Security Awareness',
        icon: Users,
        description: 'Treinamentos e campanhas de conscientização em segurança da informação.',
        color: '#10b981',
    },
    {
        name: 'Code Review',
        icon: FileSearch,
        description: 'Análise de código-fonte para identificação de falhas de segurança.',
        color: '#3b82f6',
    },
    {
        name: 'Incident Response',
        icon: AlertTriangle,
        description: 'Resposta rápida a incidentes de segurança e análise forense.',
        color: '#ec4899',
    },
    {
        name: 'Security Audit',
        icon: Lock,
        description: 'Auditoria completa de conformidade e melhores práticas de segurança.',
        color: '#06b6d4',
    },
    {
        name: 'Monitoring & SOC',
        icon: Activity,
        description: 'Monitoramento contínuo e Centro de Operações de Segurança.',
        color: '#8b5cf6',
    },
]

export default function UltraSecurityPage() {
    return (
        <Container maxWidth="lg">
            <AnimatedHero
                title="Ultra Security"
                subtitle="Cibersegurança Ofensiva e Testes de Penetração"
                description="Proteja sua empresa com testes de segurança avançados. Nossa equipe de especialistas em segurança ofensiva identifica vulnerabilidades antes que atacantes reais as explorem."
                primaryCta={{ label: 'Solicitar Avaliação', href: '/contato' }}
            />

            {/* Services Grid */}
            <Box sx={{ py: 6 }}>
                <MotionContainer delay={0.2}>
                    <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700 }}>
                        Nossos Serviços
                    </Typography>

                    <Grid container spacing={3}>
                        {SECURITY_SERVICES.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <MotionItem sx={{ height: '100%' }}>
                                        <GlassCard
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 2,
                                                p: 3
                                            }}
                                        >
                                            <Box sx={{
                                                p: 1.5,
                                                borderRadius: '12px',
                                                background: `${service.color}20`,
                                                width: 'fit-content',
                                                mb: 1
                                            }}>
                                                <Icon size={32} color={service.color} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>{service.name}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                {service.description}
                                            </Typography>
                                        </GlassCard>
                                    </MotionItem>
                                </Grid>
                            )
                        })}
                    </Grid>
                </MotionContainer>
            </Box>

            {/* Metodologia */}
            <Box sx={{ py: 6 }}>
                <MotionContainer delay={0.4}>
                    <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700 }}>
                        Nossa Metodologia
                    </Typography>

                    <GlassCard sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h5" sx={{ mb: 2, color: '#7c3aed', fontWeight: 600 }}>
                                    1. Reconhecimento
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Coleta de informações sobre o alvo usando técnicas OSINT e footprinting para mapear a superfície de ataque.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h5" sx={{ mb: 2, color: '#ef4444', fontWeight: 600 }}>
                                    2. Exploração
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Identificação e exploração de vulnerabilidades com ferramentas avançadas e técnicas manuais de invasão.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h5" sx={{ mb: 2, color: '#10b981', fontWeight: 600 }}>
                                    3. Relatório
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Documentação detalhada com evidências, classificação de risco e recomendações técnicas de correção.
                                </Typography>
                            </Grid>
                        </Grid>
                    </GlassCard>
                </MotionContainer>
            </Box>

            {/* CTA */}
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <MotionContainer delay={0.6}>
                    <GlassCard sx={{ p: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Shield size={64} style={{ marginBottom: 24 }} color="#7c3aed" />
                        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
                            Teste a Segurança da sua Empresa
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            Solicite uma avaliação de segurança e descubra suas vulnerabilidades
                        </Typography>
                        <Button
                            component={Link}
                            href="/contato"
                            variant="contained"
                            size="large"
                            sx={{
                                px: 6,
                                py: 2,
                                fontSize: '1.2rem',
                                borderRadius: '50px',
                                background: 'linear-gradient(90deg, #7c3aed 0%, #ef4444 100%)',
                                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)'
                            }}
                        >
                            Solicitar Avaliação
                        </Button>
                    </GlassCard>
                </MotionContainer>
            </Box>
        </Container>
    )
}
