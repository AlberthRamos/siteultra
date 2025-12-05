import React from 'react';
import { motion } from 'framer-motion';

const TechBackground: React.FC = () => {
  return (
    <div className="bg-ultra-dark pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Animated Blobs - Blue and Navy (No Green) */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="bg-ultra-primary/20 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="bg-ultra-accent/10 absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full blur-3xl"
      />
    </div>
  );
};

export default TechBackground;
