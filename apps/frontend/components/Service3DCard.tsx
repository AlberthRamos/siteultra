import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  variant?: 'security' | 'tax';
}

const Service3DCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, link, variant = 'tax' }) => {
  const isSecurity = variant === 'security';
  // Use ultra-security (Red/Orange) for security items
  const accentColor = isSecurity
    ? 'text-ultra-security group-hover:text-red-400'
    : 'text-ultra-accent group-hover:text-cyan-300';
  const borderColor = isSecurity ? 'hover:border-ultra-security/50' : 'hover:border-ultra-accent/50';
  const bgHover = isSecurity ? 'group-hover:bg-ultra-security/10' : 'group-hover:bg-ultra-primary/20';
  const bgGradient = isSecurity ? 'from-ultra-security/5' : 'from-ultra-primary/5';

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`group bg-ultra-card relative border border-slate-800 ${borderColor} flex h-full flex-col rounded-2xl p-8 transition-all duration-300`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} rounded-2xl to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
      />

      <div
        className={`bg-ultra-dark mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700 ${bgHover} transition-colors`}
      >
        <Icon className={`h-7 w-7 ${accentColor} transition-colors`} />
      </div>

      <h3 className="font-display mb-3 text-xl font-bold text-white transition-transform group-hover:translate-x-1">
        {title}
      </h3>
      <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-400">{description}</p>

      <Link to={link} className={`inline-flex items-center text-sm font-semibold ${accentColor} transition-colors`}>
        Saiba mais <ArrowUpRight size={16} className="ml-1" />
      </Link>
    </motion.div>
  );
};

export default Service3DCard;
