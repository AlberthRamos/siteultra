import React from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Presentation, FileSignature, Fingerprint, Calculator, Server, BookOpen } from 'lucide-react';
import { Step } from '../types';

const steps: Step[] = [
  {
    number: '01',
    title: 'Extração de Dados',
    description: 'A empresa extrai os SPEDs fiscais ou XML das folhas dos últimos 5 anos.',
    icon: Database,
  },
  {
    number: '02',
    title: 'Diagnóstico Inicial',
    description: 'Em até 72 horas, é feito o diagnóstico inicial através do software da Ultra System.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Apresentação',
    description: 'Reunião para apresentar os resultados preliminares e potencial de economia.',
    icon: Presentation,
  },
  {
    number: '04',
    title: 'Contrato',
    description: 'O cliente confirma a continuidade e formalizamos a parceria.',
    icon: FileSignature,
  },
  {
    number: '05',
    title: 'Auditoria Fina',
    description: 'Equipe técnica identifica as origens exatas dos créditos tributários.',
    icon: Fingerprint,
  },
  {
    number: '06',
    title: 'Habilitação',
    description: 'Equipe contábil habilita os créditos e inicia as compensações.',
    icon: Calculator,
  },
  {
    number: '07',
    title: 'Retificação eSocial',
    description: 'Retificação das bases do eSocial e ajuste das informações fiscais.',
    icon: Server,
  },
  {
    number: '08',
    title: 'Suporte Contínuo',
    description: 'Entrega de memorial descritivo e suporte por até 5 anos.',
    icon: BookOpen,
  },
];

const Process: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <section className="mx-auto mb-16 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <h1 className="mb-6 text-4xl font-extrabold text-white">Nossa Metodologia</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            Um processo claro, ágil e seguro, dividido em 8 passos para garantir a máxima eficiência na recuperação dos
            seus tributos.
          </p>
        </motion.div>
      </section>

      {/* Steps Timeline / Grid */}
      <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 z-0 hidden h-1 w-full -translate-y-1/2 bg-slate-800 lg:block"></div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-ultra-dark hover:shadow-ultra-primary/20 group relative z-10 rounded-xl border border-slate-700 p-6 transition-all hover:shadow-2xl"
              >
                <div className="bg-ultra-accent absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full font-bold text-white shadow-lg">
                  {step.number}
                </div>
                <div className="text-ultra-primary group-hover:text-ultra-accent mb-4 transition-colors">
                  <step.icon size={40} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="from-ultra-primary rounded-2xl bg-gradient-to-r to-blue-900 p-8 shadow-2xl md:p-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white">Segurança e Garantias</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-blue-100">
                  <span className="bg-ultra-accent mt-2 h-2 w-2 rounded-full"></span>
                  <span>
                    <strong>Seguro de R$ 10 Milhões:</strong> Cobertura para eventuais falhas humanas no processo.
                  </span>
                </li>
                <li className="flex items-start space-x-3 text-blue-100">
                  <span className="bg-ultra-accent mt-2 h-2 w-2 rounded-full"></span>
                  <span>
                    <strong>Garantia de 5 Anos:</strong> Cobrimos todo o prazo prescricional, incluindo eventos
                    judiciais.
                  </span>
                </li>
                <li className="flex items-start space-x-3 text-blue-100">
                  <span className="bg-ultra-accent mt-2 h-2 w-2 rounded-full"></span>
                  <span>
                    <strong>Compliance:</strong> Auditorias periódicas em nossos sistemas e procedimentos.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative flex justify-center">
              <div className="rounded-full border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1161/1161388.png"
                  className="h-32 w-32 opacity-90 invert"
                  alt="Shield"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
