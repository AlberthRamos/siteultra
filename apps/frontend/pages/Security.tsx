import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  Code,
  Server,
  AlertTriangle,
  Crosshair,
  Cpu,
  Bug,
  Terminal,
  FileWarning,
  Siren,
  Search,
  Activity,
  Database,
  Users,
  BookOpen,
} from 'lucide-react';
import CircuitBackground from '../components/CircuitBackground';
import { useOutletContext } from 'react-router-dom';

interface SecurityContext {
  onOpenModal: () => void;
}

const Security: React.FC = () => {
  const { onOpenModal } = useOutletContext<SecurityContext>();

  const services = [
    {
      title: 'Red Team Operation',
      description: 'Simulações avançadas de ataque para testar a resiliência da sua empresa. Atuamos como um adversário real para identificar brechas críticas.',
      icon: Crosshair,
    },
    {
      title: 'Managed Detection & Response (MDR)',
      description: 'Monitoramento e resposta ativa contra ameaças 24/7. Nossa equipe age imediatamente para conter ataques em tempo real.',
      icon: Shield,
    },
    {
      title: 'Proactive Threat Hunting',
      description: 'Detecção e neutralização de ameaças ocultas antes que causem impacto. Caçamos o que as ferramentas tradicionais não veem.',
      icon: Search,
    },
    {
      title: 'Digital Forensics & Incident Response (DFIR)',
      description: 'Investigação forense digital e resposta rápida a incidentes para mitigar danos e entender a origem do ataque.',
      icon: FileWarning,
    },
    {
      title: 'Ultra Safe – Segurança Inteligente',
      description: 'Proteção contínua contra ameaças cibernéticas usando inteligência artificial e aprendizado de máquina adaptativo.',
      icon: Cpu,
    },
    {
      title: 'SOC – Security Operations Center',
      description: 'Monitoramento centralizado de logs e eventos de segurança, garantindo visibilidade total do seu ambiente.',
      icon: Eye,
    },
    {
      title: 'Pentest (Intrusão)',
      description: 'Teste de intrusão manual e automatizado (Black, Grey, White-box) para comprovar falhas reais antes que criminosos as explorem.',
      icon: Bug,
    },
    {
      title: 'Simulação de Adversário',
      description: 'Testes personalizados que replicam TTPs (Táticas, Técnicas e Procedimentos) de grupos criminosos específicos.',
      icon: Users,
    },
    {
      title: 'Engenharia Reversa',
      description: 'Análise profunda de malwares e binários para entender seu funcionamento e criar vacinas ou defesas específicas.',
      icon: Code,
    },
    {
      title: 'Apoio ao Desenvolvimento Seguro',
      description: 'Integração de segurança no ciclo de vida do software (DevSecOps), desde a arquitetura até o deploy.',
      icon: Server,
    },
    {
      title: 'Purple Team',
      description: 'Integração sinérgica entre Red Team (Ataque) e Blue Team (Defesa) para otimizar as estratégias de proteção.',
      icon: Activity,
    },
    {
      title: 'Treinamentos & Consultorias',
      description: 'Capacitação técnica de equipes e consultoria estratégica para conformidade e governança de segurança.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-ultra-dark relative overflow-hidden py-24">
        <CircuitBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-red-500/30 bg-red-900/30 px-4 py-1">
              <span className="bg-ultra-security h-2 w-2 animate-pulse rounded-full"></span>
              <span className="text-ultra-security text-sm font-semibold tracking-wide uppercase">
                Ultra Security Division
              </span>
            </div>
            <h1 className="font-display mb-6 text-5xl font-bold text-white md:text-6xl">
              Segurança Cibernética <span className="text-gradient-security">Ofensiva</span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-400">
              Proteja dados, operações e reputação com tecnologia de ponta e monitoramento contínuo.
              Somos a <span className="text-ultra-security font-bold">Ultra Security</span>.
            </p>
            <button
              onClick={onOpenModal}
              className="bg-ultra-security transform rounded-lg px-8 py-4 font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:-translate-y-1 hover:bg-red-600"
            >
              Agendar Diagnóstico de Segurança
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-ultra-dark border-y border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-white">Soluções de Defesa e Estratégia</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Para empresas que não podem correr riscos. Um portfólio completo de serviços para blindar seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-red-500/50 hover:bg-slate-900"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-red-500 transition-colors group-hover:bg-red-500/10 group-hover:text-red-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-red-400">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology Smart Spider (Kept from original but polished content) */}
      <section className="from-ultra-dark bg-gradient-to-b to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-3xl font-bold text-white">
                Tecnologia Exclusiva <span className="text-gradient-security">Smart Spider</span>
              </h3>
              <p className="mb-6 leading-relaxed text-gray-400">
                Utilizamos uma ferramenta proprietária com alta taxa de detecção de falhas críticas.
                Nossa IA aprende continuamente com vulnerabilidades encontradas em grandes corporações globais para proteger o seu negócio.
              </p>
              <div className="space-y-4">
                <div className="flex items-start rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <AlertTriangle className="text-ultra-security mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">Entrega Garantida</h4>
                    <p className="text-sm text-gray-500">
                      Garantimos a identificação de riscos reais. Se não houver risco crítico, nosso modelo de negócio se adapta.
                    </p>
                  </div>
                </div>
                <div className="flex items-start rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <Lock className="text-ultra-security mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">Sigilo Absoluto</h4>
                    <p className="text-sm text-gray-500">
                      Operações realizadas via VPN segura com auditoria completa. Seus dados nunca saem do seu controle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Decorative Element representing Defense */}
              <div className="rounded-2xl border border-red-900/30 bg-slate-900 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-white font-mono text-sm">SYSTEM STATUS</div>
                  <div className="text-green-500 font-mono text-sm animate-pulse">SECURE</div>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-red-600 w-1/3"></div>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-red-600 w-2/3"></div>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-red-600 w-1/2"></div>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-800 rounded border border-slate-700">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-gray-500">MONITORING</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800 rounded border border-slate-700">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-xs text-gray-500">COVERAGE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ultra-dark border-t border-slate-800 py-24 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display mb-6 text-3xl font-bold text-white">
            Não espere o ataque acontecer.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            A pergunta não é se sua empresa será atacada, mas quando.
            Com a <span className="text-white font-bold">Ultra Security</span>, você antecipa ameaças e garante a continuidade do seu negócio.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-ultra-security hover:bg-ultra-security/80 transform rounded-lg px-8 py-4 font-bold text-white transition-all hover:-translate-y-1"
          >
            Proteger Minha Empresa Agora
          </button>
        </div>
      </section>
    </div>
  );
};

export default Security;
