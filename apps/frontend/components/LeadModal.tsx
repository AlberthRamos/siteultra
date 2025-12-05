import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Lock, Loader2, CheckCircle } from 'lucide-react';
import { ModalProps, LeadData } from '../types';

const LeadModal: React.FC<ModalProps> = ({ isOpen, onClose, initialService }) => {
  const [formData, setFormData] = useState<Partial<LeadData>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    service: initialService || 'Recuperação Tributária',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Phone mask
    if (name === 'phone') {
      const v = value.replace(/\D/g, '');
      const formatted =
        v.length > 10
          ? v.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3')
          : v.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload
    const payload: LeadData = {
      name: formData.name!,
      email: formData.email!,
      phone: formData.phone!,
      company: formData.company!,
      role: formData.role,
      service: formData.service!,
      source_page: window.location.pathname,
      created_at: new Date(),
    };

    // Save lead to storage
    try {
      const { default: LeadService } = await import('../services/LeadService');
      const leadService = new LeadService();
      await leadService.saveLead(payload);
      console.log('✅ Lead saved successfully:', payload);
    } catch (error) {
      console.error('❌ Error saving lead:', error);
    }

    setLoading(false);
    setSuccess(true);

    // WhatsApp Redirection
    const message = `Olá, sou ${payload.name} da empresa ${payload.company}.
Tenho interesse em: *${payload.service}*.
    
Email: ${payload.email}
Cargo: ${payload.role || 'Não informado'}

Gostaria de um diagnóstico.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5541992881153?text=${encoded}`, '_blank');

    setTimeout(() => {
      onClose();
      setSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        service: 'Recuperação Tributária',
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-ultra-dark/90 absolute inset-0 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-ultra-card relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900/50 px-6 py-4">
            <h3 className="font-display text-xl font-bold text-white">Solicitar Diagnóstico</h3>
            <button onClick={onClose} className="text-gray-400 transition-colors hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                <h4 className="mb-2 text-2xl font-bold text-white">Sucesso!</h4>
                <p className="text-gray-400">Redirecionando para o WhatsApp...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-ultra-muted mb-1 block text-xs font-bold tracking-wider uppercase">
                    Nome Completo *
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-ultra-dark focus:border-ultra-accent w-full rounded-lg border border-slate-700 px-4 py-3 text-white transition-colors focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-ultra-muted mb-1 block text-xs font-bold tracking-wider uppercase">
                      Email Corporativo *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-ultra-dark focus:border-ultra-accent w-full rounded-lg border border-slate-700 px-4 py-3 text-white transition-colors focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-ultra-muted mb-1 block text-xs font-bold tracking-wider uppercase">
                      WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className="bg-ultra-dark focus:border-ultra-accent w-full rounded-lg border border-slate-700 px-4 py-3 text-white transition-colors focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-ultra-muted mb-1 block text-xs font-bold tracking-wider uppercase">
                      Empresa
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-ultra-dark focus:border-ultra-accent w-full rounded-lg border border-slate-700 px-4 py-3 text-white transition-colors focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-ultra-muted mb-1 block text-xs font-bold tracking-wider uppercase">
                      Cargo
                    </label>
                    <input
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="bg-ultra-dark focus:border-ultra-accent w-full rounded-lg border border-slate-700 px-4 py-3 text-white transition-colors focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-ultra-muted mb-1 block text-xs font-bold tracking-wider uppercase">
                    Serviço de Interesse
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="bg-ultra-dark focus:border-ultra-accent w-full rounded-lg border border-slate-700 px-4 py-3 text-white transition-colors focus:outline-none"
                  >
                    <optgroup label="Ultra Tax">
                      <option value="Recuperação Tributária">Recuperação Tributária</option>
                      <option value="eSocial">Retificação eSocial</option>
                      <option value="Lucro Real">Lucro Real</option>
                    </optgroup>
                    <optgroup label="Ultra Security">
                      <option value="Pentest">Pentest (Red Team)</option>
                      <option value="SOC">Monitoramento SOC</option>
                      <option value="Cloud Security">Cloud Security</option>
                    </optgroup>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-ultra-primary shadow-ultra-primary/20 mt-4 flex w-full items-center justify-center space-x-2 rounded-lg py-4 font-bold text-white shadow-lg transition-transform hover:bg-blue-600 active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                  <span>{loading ? 'Processando...' : 'Receber Diagnóstico'}</span>
                </button>

                <div className="mt-4 flex items-center justify-center space-x-1 text-xs text-slate-500">
                  <Lock size={12} />
                  <span>Seus dados estão protegidos. Conexão criptografada.</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeadModal;
