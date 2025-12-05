import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Ultra Tax', path: '/servicos' },
  { label: 'Ultra Security', path: '/security' },
  { label: 'Ultra News', path: '/news' },
  { label: 'Quem Somos', path: '/about' },
  { label: 'Metodologia', path: '/processo' },
];

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${scrolled ? 'bg-ultra-dark/95 border-b border-slate-800 py-2 shadow-lg backdrop-blur-md' : 'bg-transparent py-4'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="group relative z-50 flex items-center space-x-2">
            <img
              src="/ultra.png"
              alt="Ultra Systems"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105 md:h-12"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-white ${location.pathname === item.path
                    ? item.path === '/security'
                      ? 'text-ultra-security'
                      : 'text-ultra-accent'
                    : 'text-ultra-muted'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={onOpenModal}
              className="bg-ultra-primary shadow-ultra-primary/20 hover:shadow-ultra-primary/40 transform rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Área do Cliente
            </button>
          </div>

          {/* Mobile Button */}
          <div className="relative z-50 flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-ultra-dark/98 fixed inset-0 z-40 flex items-center justify-center backdrop-blur-xl transition-all duration-300 md:hidden ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="space-y-8 text-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-display block text-2xl font-bold ${location.pathname === item.path
                  ? item.path === '/security'
                    ? 'text-ultra-security'
                    : 'text-ultra-accent'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-8">
            <button
              onClick={onOpenModal}
              className="bg-ultra-accent rounded-full px-10 py-4 text-lg font-bold text-white shadow-xl"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
