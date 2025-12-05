import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'tax' | 'security' | 'general';
}

const faqData: FAQItem[] = [
  {
    category: 'tax',
    question: 'Quanto tempo leva para recuperar créditos tributários?',
    answer:
      'O processo administrativo leva em média 60-90 dias. Para processos judiciais, o prazo pode variar de 12 a 24 meses, dependendo da complexidade e da tese aplicada.',
  },
  {
    category: 'tax',
    question: 'Quais impostos posso recuperar?',
    answer:
      'PIS, COFINS, ICMS, IPI, INSS Patronal, ISS e outros tributos federais, estaduais e municipais pagos indevidamente nos últimos 5 anos.',
  },
  {
    category: 'tax',
    question: 'Preciso pagar algo antecipado?',
    answer:
      'Não. Trabalhamos com taxa de êxito (success fee). Você só paga quando recuperar os valores. O diagnóstico inicial é 100% gratuito.',
  },
  {
    category: 'security',
    question: 'O que é Red Team e como difere de um Pentest comum?',
    answer:
      'Red Team simula um ataque real de forma contínua e furtiva, testando não só a infraestrutura, mas também a capacidade de detecção e resposta da equipe. Pentest é pontual e focado em encontrar vulnerabilidades técnicas.',
  },
  {
    category: 'security',
    question: 'O teste de invasão pode derrubar meus sistemas?',
    answer:
      'Não. Todos os testes são realizados em ambiente controlado, com aprovação prévia de escopo e horários. Temos seguro de responsabilidade civil e garantias contratuais.',
  },
  {
    category: 'security',
    question: 'Vocês garantem encontrar vulnerabilidades críticas?',
    answer:
      'Sim. Somos a única empresa que garante em contrato a entrega de pelo menos uma vulnerabilidade crítica. Caso não encontremos, ajustamos o valor do serviço.',
  },
  {
    category: 'general',
    question: 'Como funciona o diagnóstico gratuito?',
    answer:
      'Enviamos um questionário técnico, analisamos seus arquivos fiscais (SPED, XMLs) ou fazemos um scan inicial de segurança. Em 72 horas, entregamos um relatório com oportunidades identificadas.',
  },
  {
    category: 'general',
    question: 'Vocês atendem empresas de qual porte?',
    answer:
      'Atendemos desde MEIs e Simples Nacional até grandes corporações. Temos soluções customizadas para cada regime tributário e tamanho de infraestrutura.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'tax' | 'security' | 'general'>('all');

  const filteredFAQs = filter === 'all' ? faqData : faqData.filter((item) => item.category === filter);

  return (
    <section className="bg-slate-900/30 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center space-x-2">
            <HelpCircle className="text-ultra-accent h-8 w-8" />
            <h2 className="font-display text-3xl font-bold text-white">Perguntas Frequentes</h2>
          </div>
          <p className="text-gray-400">Tire suas dúvidas sobre nossos serviços</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex justify-center space-x-4">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'tax', label: 'Tributário' },
            { key: 'security', label: 'Segurança' },
            { key: 'general', label: 'Geral' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                filter === tab.key ? 'bg-ultra-accent text-white' : 'bg-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-800/80"
              >
                <span className="pr-4 font-semibold text-white">{item.question}</span>
                <ChevronDown
                  className={`text-ultra-accent h-5 w-5 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 leading-relaxed text-gray-400">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
