import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import CircuitBackground from './CircuitBackground';
import { slidesData } from '../data/content';

interface HeroProps {
  onOpenModal: () => void;
}

const HeroSlider: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slidesData[current];
  const isSecurity = currentSlide.type === 'security';

  return (
    <div className="bg-ultra-dark relative h-[700px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Dynamic Background */}
          <div className="bg-ultra-dark absolute inset-0">
            {isSecurity ? (
              <>
                <CircuitBackground />
                <div className="from-ultra-dark via-ultra-dark/90 absolute inset-0 bg-gradient-to-r to-red-900/20" />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000")',
                  }}
                />
                <div className="from-ultra-dark via-ultra-primary/20 absolute inset-0 bg-gradient-to-r to-transparent" />
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          key={`text-${current}`}
          initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center space-x-3">
            <div className={`h-1 w-12 rounded-full ${isSecurity ? 'bg-ultra-security' : 'bg-ultra-accent'}`}></div>
            <span
              className={`font-display text-sm font-bold tracking-widest uppercase ${isSecurity ? 'text-ultra-security' : 'text-ultra-accent'}`}
            >
              {isSecurity ? 'Red Team & Cyber Defense' : 'Tax Intelligence Division'}
            </span>
          </div>

          <h1 className="font-display mb-6 text-5xl leading-tight font-bold text-white lg:text-7xl">
            {currentSlide.title}
          </h1>

          <p className="mb-10 max-w-2xl border-l-4 border-white/10 pl-6 text-xl leading-relaxed text-gray-300">
            {currentSlide.subtitle}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to={currentSlide.link}>
              <button
                className={`group flex w-full items-center justify-center space-x-3 rounded-lg px-8 py-4 font-bold shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl sm:w-auto ${
                  isSecurity
                    ? 'bg-ultra-security text-white shadow-red-900/50 hover:bg-red-600'
                    : 'bg-ultra-primary shadow-ultra-primary/50 text-white hover:bg-blue-700'
                }`}
              >
                <span>{currentSlide.cta}</span>
                {isSecurity ? <ShieldCheck size={20} /> : <TrendingUp size={20} />}
              </button>
            </Link>

            <button
              onClick={onOpenModal}
              className="rounded-lg border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Agendar Diagnóstico
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-10 bottom-10 z-20 flex space-x-2 md:right-20">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === current ? (isSecurity ? 'bg-ultra-security w-12' : 'bg-ultra-accent w-12') : 'w-4 bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
