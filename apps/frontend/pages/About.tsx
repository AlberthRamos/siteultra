import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl">Quem Somos</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            A Ultra System reúne especialistas com mais de 25 anos de experiência nas áreas tributária, fiscal, contábil
            e jurídica.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-300"
          >
            <p>
              Nosso propósito é transformar a complexidade dos tributos em oportunidades reais de economia e crescimento
              para as empresas. Contamos com tecnologia parceira e uma equipe multidisciplinar para identificar valores
              pagos indevidamente e garantir total segurança jurídica em cada etapa.
            </p>
            <p>
              Com atuação nacional e processos claros, ágeis e consistentes, fortalecemos a saúde financeira dos nossos
              clientes e apoiamos decisões mais estratégicas para o futuro.
            </p>
            <div className="border-ultra-accent rounded-xl border-l-4 bg-slate-800/50 p-6">
              <h3 className="mb-2 text-lg font-bold text-white">Nosso Foco</h3>
              <p>
                Atuamos com empresas do Simples Nacional (todos anexos), Lucro Real e Lucro Presumido, trazendo
                segurança em teses consolidadas.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-ultra-accent/20 absolute inset-0 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600"
              alt="Equipe Ultra Systems"
              className="relative rounded-2xl border border-slate-700 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 text-center">
              <div className="bg-ultra-primary/20 text-ultra-accent mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Target size={32} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Missão</h3>
              <p className="text-gray-400">
                Recuperar tributos com precisão e eficiência, gerando caixa para nossos clientes.
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="bg-ultra-primary/20 text-ultra-accent mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Lightbulb size={32} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Visão</h3>
              <p className="text-gray-400">Ser referência nacional em inteligência tributária e tecnologia fiscal.</p>
            </div>
            <div className="p-6 text-center">
              <div className="bg-ultra-primary/20 text-ultra-accent mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Award size={32} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">Valores</h3>
              <p className="text-gray-400">Ética, Transparência, Segurança Jurídica e Excelência Técnica.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
