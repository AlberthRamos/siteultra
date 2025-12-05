import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Users, TrendingUp } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Award,
      title: '25+ Anos',
      subtitle: 'de Experiência',
      color: 'text-ultra-accent',
    },
    {
      icon: Shield,
      title: '100%',
      subtitle: 'Garantia Contratual',
      color: 'text-ultra-security',
    },
    {
      icon: Users,
      title: '500+',
      subtitle: 'Empresas Atendidas',
      color: 'text-purple-500',
    },
    {
      icon: TrendingUp,
      title: 'R$ 50M+',
      subtitle: 'Recuperados',
      color: 'text-green-500',
    },
  ];

  return (
    <section className="border-y border-slate-800 bg-slate-900/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                <badge.icon className={`h-8 w-8 ${badge.color}`} />
              </div>
              <div className={`text-2xl font-bold ${badge.color} mb-1`}>{badge.title}</div>
              <div className="text-sm text-gray-400">{badge.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
