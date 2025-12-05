import React from 'react';

interface UShieldProps {
  variant: 'security' | 'tax';
  size?: number;
}

const UShield: React.FC<UShieldProps> = ({ variant, size = 64 }) => {
  if (variant === 'security') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 10L90 30V70L50 90L10 70V30L50 10Z"
          stroke="#00F0FF"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="M50 40L70 50V70L50 80L30 70V50L50 40Z"
          stroke="#00F0FF"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M30 50L50 60L70 50" stroke="#00F0FF" strokeWidth="4" />
        <path d="M50 90V80" stroke="#00F0FF" strokeWidth="4" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="taxGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <path
        d="M50 10C50 10 90 30 90 30V70C90 70 50 90 50 90C50 90 10 70 10 70V30C10 30 50 10 50 10Z"
        fill="url(#taxGradient)"
      />
      <text
        x="50"
        y="55"
        fontFamily="serif"
        fontSize="40"
        fill="#D4AF37"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        U
      </text>
    </svg>
  );
};

export default UShield;
