import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-900 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="mb-4">
              <img src="/ultra.png" alt="Ultra Systems" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-ultra-muted text-sm leading-relaxed">
              Transformando a complexidade tributária em oportunidades e garantindo a segurança ofensiva da sua
              infraestrutura.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-ultra-accent text-gray-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-ultra-accent text-gray-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Soluções</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/servicos" className="text-ultra-muted hover:text-ultra-accent text-sm transition-colors">
                  Ultra Tax (Tributário)
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-ultra-muted hover:text-ultra-security text-sm transition-colors">
                  Ultra Security (Red Team)
                </Link>
              </li>
              <li>
                <Link to="/processo" className="text-ultra-muted text-sm transition-colors hover:text-white">
                  Metodologia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-ultra-accent mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="text-ultra-muted text-sm">
                  R. Comendador Araújo, 499 - 10º Andar - Centro, Curitiba - PR
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-ultra-accent h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-ultra-muted cursor-pointer text-sm hover:text-white">(41) 9 9288-1153</span>
                  <span className="text-ultra-muted cursor-pointer text-sm hover:text-white">(44) 9 9184-4311</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-ultra-accent h-5 w-5 flex-shrink-0" />
                <a href="mailto:contato@ultrasystems.com.br" className="text-ultra-muted text-sm hover:text-white">
                  contato@ultrasystems.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Legal/Compliance */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Segurança</h3>
            <p className="text-ultra-muted mb-4 text-sm">
              Compliance LGPD. Dados criptografados e auditorias periódicas.
            </p>
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-center">
              <p className="text-xs text-gray-400">Ambiente 100% Seguro</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-gray-500 md:mb-0">&copy; {new Date().getFullYear()} Ultra Systems Group.</p>
          <div className="flex space-x-6">
            <Link to="#" className="text-xs text-gray-600 hover:text-gray-400">
              Política de Privacidade
            </Link>
            <Link to="#" className="text-xs text-gray-600 hover:text-gray-400">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
