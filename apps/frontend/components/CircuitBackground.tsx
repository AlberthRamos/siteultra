import React from 'react';
import { motion } from 'framer-motion';

const CircuitBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <svg className="h-full w-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Animated Paths simulating data flow (Red/Orange for Security) */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${-100} ${100 + i * 150} H ${2000}`}
            stroke="#EF4444"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 1, 0],
              x: [0, 100],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        ))}

        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={`c-${i}`}
            cx="50%"
            cy="50%"
            r="100"
            stroke="#F97316"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default CircuitBackground;
