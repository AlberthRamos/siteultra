import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Zap,
  Leaf,
  CheckCircle2,
  Factory,
  TrendingDown,
  BadgeCheck,
  PieChart,
  Search,
  BarChart3,
  FileCheck,
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

interface ServicesContext {
  onOpenModal: () => void;
}

const Services: React.FC = () => {
  const { onOpenModal } = useOutletContext<ServicesContext>();
  const taxTests = [
    {
      title: 'Lucro Real',
      description: 'Ideal para empresas com faturamento elevado ou margens apertadas.',
      items: [
        'INSS Patronal (Recuperação)',
        'Tese dos Embutidos',
        'Créditos de PIS/COFINS sobre Insumos',
        'ICMS Energia Elétrica',
        'Lei Perse e Subvenções',
        'Exclusão do ICMS da base do PIS/COFINS',
      ],
    },
    {
      title: 'Lucro Presumido',
      description: 'Foco em teses jurídicas e oportunidades específicas de cada setor.',
      items: [
        'Crédito Presumido do Aço',
        'Tese do IPI Atacadista',
        'Exclusão do PIS/COFINS da Base Própria',
        'Recuperação de Monofásicos',
        'ICMS-ST: Restituição',
        'Revisão de Classificação Fiscal',
      ],
    },
    {
      title: 'Simples Nacional',
      description: 'Recuperação administrativa rápida para pequenos e médios negócios.',
      items: [
        'Segregação de Receitas (Monofásicos)',
        'PIS/COFINS de Bebidas e Autopeças',
        'Restituição em até 60 dias',
        'Revisão dos últimos 5 anos',
      ],
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="mx-auto mb-16 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-ultra-primary/20 text-ultra-accent mb-4 inline-block rounded-full px-4 py-1 text-sm font-bold">
            Ultra Tax Division
          </div>
          <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl">Inteligência Tributária</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            Transformamos obrigações fiscais em ativos financeiros. Nossa tecnologia revisa 100% das suas operações nos
            últimos 5 anos.
          </p>
        </motion.div>
      </section>

      {/* Main Benefits Cards */}
      <section className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {taxTests.map((regime, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-ultra-card hover:border-ultra-accent hover:shadow-ultra-accent/10 flex flex-col rounded-2xl border border-slate-700 p-8 shadow-xl transition-all"
            >
              <div className="mb-4 flex items-center space-x-3">
                <div className="bg-ultra-primary/20 rounded-lg p-3">
                  <FileText className="text-ultra-accent h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">{regime.title}</h3>
              </div>
              <p className="mb-6 h-10 text-sm text-gray-400">{regime.description}</p>

              <ul className="mb-8 flex-grow space-y-3">
                {regime.items.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2 text-gray-300">
                    <CheckCircle2 className="text-ultra-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenModal}
                className="hover:bg-ultra-accent w-full rounded-lg border border-slate-600 py-3 text-sm font-semibold text-white transition-all hover:border-transparent"
              >
                Solicitar Análise
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deep Dive Services */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">Soluções Específicas</h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* eSocial */}
            <div className="group flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-ultra-primary/20 group-hover:bg-ultra-accent flex h-14 w-14 items-center justify-center rounded-2xl transition-colors">
                  <Zap className="text-ultra-accent h-7 w-7 transition-colors group-hover:text-white" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">Retificação Automática do eSocial</h3>
                <p className="mb-3 leading-relaxed text-gray-400">
                  Tecnologia proprietária que analisa colaborador por colaborador, rubrica por rubrica. Identificamos
                  incidências indevidas de INSS sobre verbas indenizatórias e realizamos a retificação automática na
                  base do governo.
                </p>
                <span className="text-ultra-accent text-sm font-semibold">Recuperação média de 2% da folha</span>
              </div>
            </div>

            {/* Rural */}
            <div className="group flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-900/20 transition-colors group-hover:bg-green-600">
                  <Leaf className="h-7 w-7 text-green-500 transition-colors group-hover:text-white" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">Agronegócio & Produtor Rural</h3>
                <p className="mb-3 leading-relaxed text-gray-400">
                  Atendimento especializado para Produtores Rurais (PF e PJ), CEI e Condomínios. Foco na recuperação de
                  Funrural e créditos sobre insumos agrícolas (fertilizantes, defensivos, combustível).
                </p>
              </div>
            </div>

            {/* Industry */}
            <div className="group flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-ultra-primary/20 group-hover:bg-ultra-accent flex h-14 w-14 items-center justify-center rounded-2xl transition-colors">
                  <Factory className="text-ultra-accent h-7 w-7 transition-colors group-hover:text-white" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">Indústria e Atacado</h3>
                <p className="mb-3 leading-relaxed text-gray-400">
                  Análises profundas sobre IPI, Crédito Presumido do Aço e teses de insumos essenciais. Otimizamos a
                  cadeia produtiva para reduzir o custo final do produto.
                </p>
              </div>
            </div>

            {/* Legal Support */}
            <div className="group flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-ultra-primary/20 group-hover:bg-ultra-accent flex h-14 w-14 items-center justify-center rounded-2xl transition-colors">
                  <BadgeCheck className="text-ultra-accent h-7 w-7 transition-colors group-hover:text-white" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">Cumprimento de Sentença</h3>
                <p className="mb-3 leading-relaxed text-gray-400">
                  Transformamos decisões judiciais em dinheiro no caixa. Conduzimos a execução integral do processo para
                  empresas que já possuem o direito reconhecido, mas ainda não receberam os valores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-ultra-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-white">Metodologia Ultra Tax</h2>
            <p className="text-gray-400">Auditoria fiscal completa em 3 fases</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="hover:border-ultra-accent/50 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8 transition-all">
              <div className="bg-ultra-accent/10 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <Search className="text-ultra-accent h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">1. Varredura (Scan)</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Coleta e processamento de arquivos digitais (SPED, XMLs) dos últimos 60 meses. Nossa IA cruza mais de
                15.000 regras fiscais para encontrar inconsistências.
              </p>
            </div>
            <div className="hover:border-ultra-accent/50 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8 transition-all">
              <div className="bg-ultra-accent/10 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <BarChart3 className="text-ultra-accent h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">2. Qualificação</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Segregação dos créditos com base legal sólida. Eliminamos riscos de glosa e preparamos o dossiê técnico
                para retificação.
              </p>
            </div>
            <div className="hover:border-ultra-accent/50 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8 transition-all">
              <div className="bg-ultra-accent/10 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <FileCheck className="text-ultra-accent h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">3. Recuperação</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Protocolo administrativo ou judicial dos pedidos de restituição/compensação. Acompanhamento até o
                crédito em conta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-white">Diagnóstico Gratuito em 72 horas</h2>
          <button
            onClick={onOpenModal}
            className="bg-ultra-accent transform rounded-full px-10 py-4 font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:bg-cyan-600"
          >
            Falar com Consultor Tributário
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
