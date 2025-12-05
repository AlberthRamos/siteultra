import { Box, Container, Typography, Paper, Stepper, Step, StepLabel, StepContent, Button } from '@mui/material'
import { TrendingUp, FileText, Calculator, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedHero } from '@/components/ui/AnimatedHero'
import { GlassCard } from '@/components/ui/GlassCard'
import { MotionContainer, MotionItem } from '@/components/ui/MotionContainer'

export const revalidate = 3600

const AUDIT_STEPS = [
    {
        label: 'Análise Preliminar',
        description: 'Avaliação inicial dos dados fiscais e identificação de oportunidades potenciais de recuperação tributária.',
    },
    {
        label: 'Coleta de Documentos',
        description: 'Solicitação e organização de documentação fiscal necessária (SPEDs, DARFs, NFes, etc.).',
    },
    {
        label: 'Auditoria Fiscal',
        description: 'Análise detalhada dos tributos pagos e identificação de inconsistências e oportunidades.',
    },
    {
        label: 'Identificação de Créditos',
        description: 'Mapeamento completo de créditos tributários recuperáveis (PIS, COFINS, ICMS, IRPJ, CSLL).',
    },
    {
        label: 'Cálculo de Recuperação',
        description: 'Quantificação precisa dos valores recuperáveis com base na legislação vigente.',
    },
    {
        label: 'Preparação de Documentação',
        description: 'Elaboração de relatórios técnicos e documentação para protocolo junto à Receita Federal.',
    },
    {
        label: 'Protocolo junto à Receita',
        description: 'Submissão formal dos pedidos de restituição ou compensação tributária.',
    },
    {
        label: 'Acompanhamento e Recebimento',
        description: 'Monitoramento do processo até a efetiva recuperação dos valores.',
    },
]

export default function UltraTaxPage() {
    return (
        <Container maxWidth="lg">
            <AnimatedHero
                title="Ultra Tax"
                subtitle="Recuperação Inteligente de Créditos Tributários"
                description="Utilizamos tecnologia de ponta e expertise fiscal para identificar e recuperar créditos tributários que sua empresa tem direito. Nossa metodologia já recuperou milhões de reais para empresas de diversos segmentos."
                primaryCta={{ label: 'Solicitar Análise', href: '/contato' }}
            />

            {/* Processo de 8 Etapas */}
            <Box sx={{ py: 6 }}>
                <MotionContainer delay={0.2}>
                    <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700 }}>
                        Nosso Processo
                    </Typography>

                    <GlassCard sx={{ p: 4 }}>
                        <Stepper orientation="vertical">
                            {AUDIT_STEPS.map((step, index) => (
                                <Step key={index} active expanded>
                                    <StepLabel>
                                        <Typography variant="h6" sx={{ color: '#00f2ff' }}>{step.label}</Typography>
                                    </StepLabel>
                                    <StepContent>
                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                            {step.description}
                                        </Typography>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </GlassCard>
                </MotionContainer>
            </Box>

            {/* Benefícios */}
            <Box sx={{ py: 6 }}>
                <MotionContainer delay={0.4}>
                    <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700 }}>
                        Benefícios
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        {[
                            'Recuperação de valores pagos indevidamente',
                            'Redução da carga tributária futura',
                            'Melhoria do fluxo de caixa',
                            'Conformidade fiscal garantida',
                            'Tecnologia Verot (SpedAdvisor)',
                            'Equipe especializada em tributos',
                        ].map((benefit, index) => (
                            <MotionItem key={index}>
                                <GlassCard sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'center' }} hoverEffect>
                                    <CheckCircle size={24} color="#10b981" />
                                    <Typography variant="h6">{benefit}</Typography>
                                </GlassCard>
                            </MotionItem>
                        ))}
                    </Box>
                </MotionContainer>
            </Box>

            {/* CTA */}
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <MotionContainer delay={0.6}>
                    <GlassCard sx={{ p: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Calculator size={64} style={{ marginBottom: 24 }} color="#00f2ff" />
                        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
                            Quanto sua empresa pode recuperar?
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            Solicite uma análise gratuita e descubra as oportunidades de recuperação
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
                                background: 'linear-gradient(90deg, #00f2ff 0%, #7c3aed 100%)',
                                boxShadow: '0 10px 30px rgba(0, 242, 255, 0.3)'
                            }}
                        >
                            Solicitar Análise Gratuita
                        </Button>
                    </GlassCard>
                </MotionContainer>
            </Box>
        </Container>
    )
}
