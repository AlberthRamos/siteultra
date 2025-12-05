import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Building2 } from 'lucide-react';

const ClientLogos: React.FC = () => {
  const clients = [
    { name: 'Indústria Metalúrgica', sector: 'Manufatura' },
    { name: 'Fintech Brasil', sector: 'Tecnologia' },
    { name: 'Rede de Varejo', sector: 'Varejo' },
    { name: 'Agronegócio Sul', sector: 'Agro' },
    { name: 'Hospital Regional', sector: 'Saúde' },
    { name: 'Construtora Prime', sector: 'Construção' },
  ];

  return (
    <section className="border-y border-slate-800 bg-slate-900/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h3 className="font-display mb-2 text-2xl font-bold text-white">Empresas que Confiam</h3>
          <p className="text-gray-400">Mais de 500 empresas recuperaram milhões com a Ultra Systems</p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hover:border-ultra-accent/50 group flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-all"
            >
              <div className="group-hover:bg-ultra-accent/20 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 transition-colors">
                {index % 4 === 0 && <Building2 className="group-hover:text-ultra-accent h-6 w-6 text-gray-400" />}
                {index % 4 === 1 && <Shield className="group-hover:text-ultra-accent h-6 w-6 text-gray-400" />}
                {index % 4 === 2 && <Award className="group-hover:text-ultra-accent h-6 w-6 text-gray-400" />}
                {index % 4 === 3 && <Users className="group-hover:text-ultra-accent h-6 w-6 text-gray-400" />}
              </div>
              <div className="text-center">
                <div className="mb-1 text-xs font-semibold text-white">{client.name}</div>
                <div className="text-[10px] text-gray-500">{client.sector}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            * Nomes genéricos por questões de confidencialidade. Casos reais disponíveis mediante NDA.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
