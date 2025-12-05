import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const message = `Olá, vim pelo formulário de contato do site.
    
Nome: ${data.name}
Empresa: ${data.company}
Email: ${data.email}
Telefone: ${data.phone}

Mensagem: ${data.message}`;

    const encoded = encodeURIComponent(message);

    setTimeout(() => {
      window.open(`https://wa.me/5541992881153?text=${encoded}`, '_blank');
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="mb-6 text-4xl font-extrabold text-white">Fale Conosco</h1>
            <p className="mb-12 text-lg text-gray-300">
              Estamos prontos para realizar um diagnóstico da sua empresa. Entre em contato e descubra quanto você pode
              recuperar.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-ultra-primary/20 rounded-lg p-3">
                  <MapPin className="text-ultra-accent h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Endereço</h3>
                  <p className="text-gray-400">
                    R. Comendador Araújo, 499 - 10º Andar
                    <br />
                    Centro, Curitiba - PR, 80420-000
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-ultra-primary/20 rounded-lg p-3">
                  <Phone className="text-ultra-accent h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Telefones</h3>
                  <p className="text-gray-400">(41) 9 9288-1153</p>
                  <p className="text-gray-400">(44) 9 9184-4311</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-ultra-primary/20 rounded-lg p-3">
                  <Mail className="text-ultra-accent h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Email</h3>
                  <p className="text-gray-400">contato@ultrasystems.com.br</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-xl"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Envie uma mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">Nome</label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="focus:border-ultra-accent w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white transition-colors focus:outline-none"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">Empresa</label>
                  <input
                    name="company"
                    required
                    type="text"
                    className="focus:border-ultra-accent w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white transition-colors focus:outline-none"
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">Email</label>
                <input
                  name="email"
                  required
                  type="email"
                  className="focus:border-ultra-accent w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white transition-colors focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">Telefone</label>
                <input
                  name="phone"
                  required
                  type="tel"
                  className="focus:border-ultra-accent w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white transition-colors focus:outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">Mensagem</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="focus:border-ultra-accent w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white transition-colors focus:outline-none"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-ultra-accent flex w-full items-center justify-center space-x-2 rounded-lg py-4 font-bold text-white transition-transform hover:bg-sky-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                <span>{loading ? 'Enviando...' : 'Enviar Mensagem'}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
