import React from 'react';
import { Download } from 'lucide-react';

const PWAInstallButton: React.FC = () => {
  return (
    <button
      id="pwa-install-btn"
      style={{ display: 'none' }}
      className="bg-ultra-accent fixed right-6 bottom-20 z-50 flex transform items-center space-x-2 rounded-full px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-cyan-600"
      aria-label="Instalar aplicativo"
    >
      <Download size={20} />
      <span className="text-sm font-semibold">Instalar App</span>
    </button>
  );
};

export default PWAInstallButton;
