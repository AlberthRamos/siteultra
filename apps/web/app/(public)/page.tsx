'use client';

import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Security, Assessment, School, AttachMoney, Speed, Support } from '@mui/icons-material';
import Link from 'next/link';
import GlassCard from '../ui/GlassCard';

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const ultraTaxProducts = [
    {
      id: 'tax-recovery',
      name: 'Recuperação Tributária',
      icon: <AttachMoney sx={{ fontSize: 40, color: '#f59e0b' }} />,
      description: 'Recupere créditos tributários de forma automatizada',
      features: ['Análise PIS/COFINS', 'Cálculo de ICMS', 'Geração de DARFs', 'Relatórios detalhados'],
      benefits: ['Economia de até 30%', 'Processo automatizado', 'Equipe especializada', 'Sem custo inicial'],
      color: '#f59e0b'
    },
    {
      id: 'tax-planning',
      name: 'Planejamento Tributário',
      icon: <Assessment sx={{ fontSize: 40, color: '#3b82f6' }} />,
      description: 'Otimize sua carga tributária com planejamento estratégico',
      features: ['Análise fiscal', 'Simulações', 'Recomendações', 'Monitoramento'],
      benefits: ['Redução legal', 'Compliance garantido', 'Decisões baseadas em dados', 'Economia a longo prazo'],
      color: '#3b82f6'
    },
    {
      id: 'sped-consulting',
      name: 'Consultoria SPED',
      icon: <Speed sx={{ fontSize: 40, color: '#10b981' }} />,
      description: 'Especialistas em obrigações acessórias SPED',
      features: ['SPED Fiscal', 'SPED Contribuições', 'Validação', 'Suporte auditorias'],
      benefits: ['Evite multas', 'Conformidade garantida', 'Equipe atualizada', 'Processo descomplicado'],
      color: '#10b981'
    }
  ];

  const ultraSecurityProducts = [
    {
      id: 'pentest',
      name: 'Penetration Testing',
      icon: <Security sx={{ fontSize: 40, color: '#ef4444' }} />,
      description: 'Testes de invasão simulados para identificar vulnerabilidades',
      features: ['Testes automatizados', 'Análise web', 'Testes de rede', 'Simulações reais'],
      benefits: ['Identificação proativa', 'Correção preventiva', 'Conformidade', 'Certificado'],
      color: '#ef4444'
    },
    {
      id: 'vulnerability-assessment',
      name: 'Assessment de Vulnerabilidades',
      icon: <Shield sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      description: 'Análise completa de pontos fracos na segurança',
      features: ['Scan automatizado', 'Análise configurações', 'Verificação patches', 'Priorização'],
      benefits: ['Visão completa', 'Ações corretivas claras', 'Redução de riscos', 'Melhoria contínua'],
      color: '#8b5cf6'
    },
    {
      id: 'security-training',
      name: 'Treinamento em Segurança',
      icon: <School sx={{ fontSize: 40, color: '#06b6d4' }} />,
      description: 'Capacitação da equipe em práticas de segurança',
      features: ['Treinamentos personalizados', 'Simulações phishing', 'Workshops', 'Certificados'],
      benefits: ['Equipe preparada', 'Redução de erros', 'Cultura de segurança', 'ROI comprovado'],
      color: '#06b6d4'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(0, 242, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      lineHeight: 1.2,
                      mb: 3,
                      background: 'linear-gradient(45deg, #00f2ff, #7c3aed)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Transforme Seu Negócio com
                    <br />
                    Inteligência e Segurança
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 4,
                      fontSize: { xs: '1.1rem', md: '1.3rem' }
                    }}
                  >
                    Soluções completas em recuperação tributária e cibersegurança ofensiva 
                    para empresas que buscam excelência e proteção máxima.
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      component={Link}
                      href="/ultra-tax"
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
                        color: 'black',
                        fontWeight: 'bold',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        '&:hover': {
                          background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Explorar UltraTax
                    </Button>
                    <Button
                      component={Link}
                      href="/ultra-security"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#ef4444',
                        color: '#ef4444',
                        fontWeight: 'bold',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        '&:hover': {
                          background: 'rgba(239, 68, 68, 0.1)',
                          borderColor: '#ef4444'
                        }
                      }}
                    >
                      Conhecer UltraSecurity
                    </Button>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Box 
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: { xs: 300, md: 400 },
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        border: '2px solid rgba(0, 242, 255, 0.3)',
                        borderRadius: '50%'
                      }}
                    />
                    <motion.div
                      animate={{ 
                        rotate: -360,
                        scale: [1, 1.03, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{
                        position: 'absolute',
                        width: '150px',
                        height: '150px',
                        border: '2px solid rgba(124, 58, 237, 0.3)',
                        borderRadius: '50%'
                      }}
                    />
                    <Box 
                      sx={{
                        width: 100,
                        height: 100,
                        background: 'linear-gradient(45deg, #00f2ff, #7c3aed)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white'
                      }}
                    >
                      US
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* UltraTax Section */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center" mb={6}>
              <Chip 
                icon={<TrendingUp />} 
                label="Inteligência Tributária" 
                sx={{ 
                  background: 'linear-gradient(45deg, #f59e0b, #fbbf24)',
                  color: 'black',
                  fontWeight: 'bold',
                  mb: 2
                }} 
              />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                UltraTax - Maximização de Recursos
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 800, mx: 'auto' }}>
                Recupere créditos tributários, otimize sua carga fiscal e garanta conformidade com nossas 
                soluções especializadas em inteligência tributária.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {ultraTaxProducts.map((product, index) => (
              <Grid item xs={12} md={4} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <GlassCard>
                    <CardContent sx={{ p: 4, height: '100%' }}>
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        {product.icon}
                      </Box>
                      
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                        {product.name}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
                        {product.description}
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: product.color, fontWeight: 'bold', mb: 1 }}>
                          Principais Recursos:
                        </Typography>
                        {product.features.map((feature, idx) => (
                          <Typography key={idx} variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}>
                            • {feature}
                          </Typography>
                        ))}
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                          Benefícios:
                        </Typography>
                        {product.benefits.map((benefit, idx) => (
                          <Typography key={idx} variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}>
                            ✓ {benefit}
                          </Typography>
                        ))}
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background: `linear-gradient(45deg, ${product.color}, ${product.color}aa)`,
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: 3,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${product.color}40`
                          }
                        }}
                      >
                        Saiba Mais
                      </Button>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={6}>
            <Button
              component={Link}
              href="/ultra-tax"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#f59e0b',
                color: '#f59e0b',
                fontWeight: 'bold',
                px: 6,
                py: 1.5,
                borderRadius: 3,
                '&:hover': {
                  background: 'rgba(245, 158, 11, 0.1)',
                  borderColor: '#fbbf24'
                }
              }}
            >
              Ver Todos os Serviços UltraTax
            </Button>
          </Box>
        </Container>
      </Box>

      {/* UltraSecurity Section */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center" mb={6}>
              <Chip 
                icon={<Shield />} 
                label="Cibersegurança Ofensiva" 
                sx={{ 
                  background: 'linear-gradient(45deg, #ef4444, #f87171)',
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 2
                }} 
              />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                UltraSecurity - Proteção Máxima
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 800, mx: 'auto' }}>
                Proteja sua empresa contra ameaças cibernéticas com nossos serviços especializados 
                em segurança ofensiva e testes de invasão.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {ultraSecurityProducts.map((product, index) => (
              <Grid item xs={12} md={4} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <GlassCard>
                    <CardContent sx={{ p: 4, height: '100%' }}>
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        {product.icon}
                      </Box>
                      
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                        {product.name}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
                        {product.description}
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: product.color, fontWeight: 'bold', mb: 1 }}>
                          Principais Recursos:
                        </Typography>
                        {product.features.map((feature, idx) => (
                          <Typography key={idx} variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}>
                            • {feature}
                          </Typography>
                        ))}
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                          Benefícios:
                        </Typography>
                        {product.benefits.map((benefit, idx) => (
                          <Typography key={idx} variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}>
                            ✓ {benefit}
                          </Typography>
                        ))}
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background: `linear-gradient(45deg, ${product.color}, ${product.color}aa)`,
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: 3,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${product.color}40`
                          }
                        }}
                      >
                        Saiba Mais
                      </Button>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={6}>
            <Button
              component={Link}
              href="/ultra-security"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#ef4444',
                color: '#ef4444',
                fontWeight: 'bold',
                px: 6,
                py: 1.5,
                borderRadius: 3,
                '&:hover': {
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderColor: '#f87171'
                }
              }}
            >
              Ver Todos os Serviços UltraSecurity
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #7c3aed 0%, #00f2ff 100%)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center">
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                Pronto para Transformar Seu Negócio?
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4, maxWidth: 600, mx: 'auto' }}>
                Entre em contato com nossa equipe especializada e descubra como nossas soluções 
                podem impulsionar seus resultados e proteger seus ativos.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/contato"
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'white',
                    color: '#7c3aed',
                    fontWeight: 'bold',
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.9)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Falar com Especialista
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white'
                    }
                  }}
                >
                  Agendar Demonstração
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;