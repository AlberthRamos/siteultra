import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="bg-ultra-dark fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ pointerEvents: progress === 100 ? 'none' : 'auto' }}
    >
      <div className="text-center">
        <img src="/ultra.png" alt="Ultra Systems" className="mx-auto mb-8 h-16 animate-pulse" />

        <div className="h-2 w-64 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="from-ultra-accent to-ultra-primary h-full bg-gradient-to-r"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="mt-4 text-sm text-gray-400">Carregando {progress}%</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
