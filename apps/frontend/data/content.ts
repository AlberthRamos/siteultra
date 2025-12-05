import { Shield, DollarSign, Activity, FileSpreadsheet, Lock, Crosshair } from 'lucide-react';

export const homeContent = {
  heroSlider: {
    slides: [
      {
        title: 'Inteligência Tributária e Cibersegurança Ofensiva',
        subtitle: 'Protegendo o presente e financiando o futuro do seu negócio.',
        buttonText: 'Solicitar Diagnóstico Gratuito',
        image: '/hero-tax.jpg',
      },
      {
        title: 'Recupere Créditos Tributários e Fortaleça sua Segurança',
        subtitle: 'Nossa abordagem integrada maximiza seus resultados financeiros e protege seus ativos digitais.',
        buttonText: 'Conheça Nossas Soluções',
        image: '/hero-security.jpg',
      },
    ],
  },
  integratedSolutions: {
    title: 'Soluções Integradas',
    description:
      'Unimos inteligência tributária e cibersegurança ofensiva para proteger o presente e financiar o futuro da sua empresa.',
  },
  services: {
    tax: [
      {
        title: 'Recuperação Tributária',
        description:
          'Identificação e recuperação de créditos pagos indevidamente no Lucro Real, Presumido e Simples Nacional.',
        icon: DollarSign,
        link: '/servicos',
      },
      {
        title: 'Retificação eSocial',
        description:
          'Tecnologia exclusiva para retificação automática de rubricas, garantindo compliance e retorno financeiro.',
        icon: Activity,
        link: '/servicos',
      },
      {
        title: 'Compliance Fiscal',
        description: 'Auditoria preventiva e cruzamento de dados para evitar autuações e otimizar a carga tributária.',
        icon: FileSpreadsheet,
        link: '/servicos',
      },
    ],
    security: [
      {
        title: 'Red Team (Pentest)',
        description: 'Simulação de ataques reais para testar a resiliência da sua infraestrutura contra hackers.',
        icon: Crosshair,
        link: '/security',
      },
      {
        title: 'Monitoramento SOC',
        description: 'Vigilância 24/7 da sua rede e aplicações com resposta imediata a incidentes de segurança.',
        icon: Shield,
        link: '/security',
      },
      {
        title: 'Cloud Security',
        description: 'Proteção avançada para ambientes em nuvem e aplicações web críticas.',
        icon: Lock,
        link: '/security',
      },
    ],
  },
  whyUltraSystems: {
    title: 'Por que Ultra Systems?',
    reasons: [
      {
        icon: '25+',
        title: 'Anos de Experiência',
        description: 'Expertise consolidada nas áreas tributária e jurídica.',
      },
      {
        icon: Shield,
        title: 'Tecnologia de Ponta',
        description:
          'Softwares exclusivos para auditoria fiscal e ferramentas de IA para cibersegurança (Smart Spider).',
      },
      {
        icon: Lock,
        title: 'Segurança Jurídica',
        description: 'Atuação integrada com garantia contratual e seguro de responsabilidade civil.',
      },
    ],
    cta: {
      title: 'Potencialize seu Negócio',
      description:
        'Solicite um diagnóstico gratuito e descubra vulnerabilidades ocultas ou créditos tributários a recuperar em até 72 horas.',
      buttonText: 'Solicitar Diagnóstico',
    },
  },
  howWeWork: {
    title: 'Como Atuamos',
    subtitle: 'Metodologia ágil e transparente em 4 etapas',
    steps: [
      {
        step: '01',
        title: 'Diagnóstico',
        desc: 'Análise preliminar sem custo para identificar oportunidades ou riscos.',
      },
      { step: '02', title: 'Planejamento', desc: 'Definição da estratégia jurídica ou técnica (Pentest/Tax).' },
      { step: '03', title: 'Execução', desc: 'Implementação das soluções com monitoramento em tempo real.' },
      { step: '04', title: 'Resultado', desc: 'Entrega de relatórios, recuperação de valores ou blindagem.' },
    ],
  },
  realResults: {
    title: 'Resultados Reais',
    testimonials: [
      {
        value: 'R$ 2.5M',
        title: 'Recuperados em PIS/COFINS',
        quote:
          'A Ultra Systems identificou créditos que nossa contabilidade anterior desconhecia. O processo foi rápido e seguro.',
        client: '- Indústria Metalúrgica, PR',
      },
      {
        value: '15+',
        title: 'Falhas Críticas Corrigidas',
        quote:
          'O Pentest revelou vulnerabilidades que poderiam ter parado nossa operação. A equipe de Red Team é excepcional.',
        client: '- Fintech, SP',
      },
      {
        value: '100%',
        title: 'Compliance no eSocial',
        quote: 'A retificação automática da folha nos trouxe economia mensal imediata e segurança jurídica.',
        client: '- Rede de Varejo, SC',
      },
    ],
  },
  finalCta: {
    title: 'Pronto para transformar seu negócio?',
    buttons: {
      tax: 'Ver Soluções Fiscais',
      security: 'Ver Soluções de Segurança',
    },
  },
};
