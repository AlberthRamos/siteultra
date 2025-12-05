import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, Loader2 } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (token: string, user: any) => void;
}

const CRMLogin: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro no login');
      }

      localStorage.setItem('crm_token', data.token);
      localStorage.setItem('crm_user', JSON.stringify(data.user));

      onLoginSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="from-ultra-dark to-ultra-dark flex min-h-screen items-center justify-center bg-gradient-to-br via-slate-900 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="bg-ultra-accent/20 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <Shield className="text-ultra-accent h-8 w-8" />
          </div>
          <h1 className="font-display mb-2 text-3xl font-bold text-white">Ultra CRM</h1>
          <p className="text-gray-400">Sistema Administrativo de Gestão de Leads</p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">Email Corporativo</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@ultrasystemsgroup.com.br"
                  required
                  className="focus:border-ultra-accent w-full rounded-lg border border-slate-600 bg-slate-900/50 py-3 pr-4 pl-11 text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-300">Senha</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="focus:border-ultra-accent w-full rounded-lg border border-slate-600 bg-slate-900/50 py-3 pr-4 pl-11 text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-ultra-accent flex w-full items-center justify-center rounded-lg py-3 font-semibold text-white transition-colors hover:bg-cyan-600 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Acesso restrito a administradores</p>
          <p className="mt-1">Ultra Systems © 2024</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CRMLogin;
