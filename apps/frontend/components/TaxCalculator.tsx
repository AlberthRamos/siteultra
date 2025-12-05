import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

const TaxCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState('');
  const [regime, setRegime] = useState('lucro-real');
  const [result, setResult] = useState<number | null>(null);

  const calculateEstimate = () => {
    const revenueNum = parseFloat(revenue.replace(/\D/g, ''));
    if (!revenueNum) return;

    let percentage = 0;
    switch (regime) {
      case 'lucro-real':
        percentage = 0.025; // 2.5% média
        break;
      case 'lucro-presumido':
        percentage = 0.018; // 1.8% média
        break;
      case 'simples':
        percentage = 0.012; // 1.2% média
        break;
    }

    setResult(revenueNum * percentage);
  };

  const formatCurrency = (value: string) => {
    const num = value.replace(/\D/g, '');
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(num) / 100);
  };

  return (
    <section className="from-ultra-dark to-ultra-dark relative overflow-hidden bg-gradient-to-br via-slate-900 py-20">
      <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center space-x-2">
            <Calculator className="text-ultra-accent h-8 w-8" />
            <h2 className="font-display text-3xl font-bold text-white">Calculadora de Economia</h2>
          </div>
          <p className="text-gray-400">Estime quanto sua empresa pode recuperar em créditos tributários</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-sm"
        >
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold tracking-wider text-gray-400 uppercase">
                Faturamento Anual
              </label>
              <div className="relative">
                <DollarSign className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={revenue}
                  onChange={(e) => setRevenue(formatCurrency(e.target.value))}
                  placeholder="R$ 0,00"
                  className="focus:border-ultra-accent w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pr-4 pl-10 text-white transition-colors focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold tracking-wider text-gray-400 uppercase">
                Regime Tributário
              </label>
              <select
                value={regime}
                onChange={(e) => setRegime(e.target.value)}
                className="focus:border-ultra-accent w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white transition-colors focus:outline-none"
              >
                <option value="lucro-real">Lucro Real</option>
                <option value="lucro-presumido">Lucro Presumido</option>
                <option value="simples">Simples Nacional</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateEstimate}
            className="bg-ultra-accent flex w-full transform items-center justify-center space-x-2 rounded-lg py-4 font-bold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:bg-cyan-600"
          >
            <span>Calcular Estimativa</span>
            <ArrowRight size={20} />
          </button>

          {result !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="from-ultra-accent/10 to-ultra-primary/10 border-ultra-accent/30 mt-8 rounded-xl border bg-gradient-to-r p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-gray-400">Estimativa de Recuperação</p>
                  <p className="text-ultra-accent text-4xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(result)}
                  </p>
                </div>
                <TrendingUp className="text-ultra-accent h-12 w-12" />
              </div>
              <p className="mt-4 text-xs text-gray-500">
                * Estimativa baseada em médias de mercado. O valor real pode variar conforme análise detalhada.
              </p>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Quer um diagnóstico preciso?{' '}
            <button className="text-ultra-accent font-semibold hover:underline">Fale com nossos especialistas</button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TaxCalculator;
