import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Eye, Calendar, Building2, Mail, Phone } from 'lucide-react';
import LeadService, { Lead } from '../services/LeadService';

const LeadsDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const leadService = new LeadService();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const allLeads = await leadService.getLeads();
      setLeads(allLeads.reverse()); // Most recent first
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const csv = toCSV(leads);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-ultra-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toCSV = (data: Lead[]): string => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((lead) =>
      Object.values(lead)
        .map((v) => `"${v}"`)
        .join(','),
    );
    return [headers, ...rows].join('\n');
  };

  const clearAll = () => {
    if (confirm('Tem certeza que deseja apagar todos os leads?')) {
      alert('Para limpar leads, use o Mongo Express em http://localhost:8081');
    }
  };

  const filteredLeads =
    filter === 'all' ? leads : leads.filter((l) => l.service.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="bg-ultra-dark min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display mb-2 text-3xl font-bold text-white">Dashboard de Leads</h1>
            <p className="text-gray-400">
              Total: <span className="text-ultra-accent font-bold">{leads.length}</span> leads capturados
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="bg-ultra-accent flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={18} />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            >
              <Trash2 size={18} />
              <span>Limpar Tudo</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-4">
          {['all', 'Recuperação Tributária', 'Pentest', 'SOC'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                filter === f ? 'bg-ultra-accent text-white' : 'bg-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>

        {/* Leads Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="border-ultra-accent mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2"></div>
            <p className="text-gray-400">Carregando leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center">
            <Eye className="mx-auto mb-4 h-16 w-16 text-gray-600" />
            <p className="text-gray-400">Nenhum lead capturado ainda</p>
            <p className="mt-2 text-sm text-gray-500">Capture um lead através do formulário para vê-lo aqui</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:border-ultra-accent/50 rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                    <p className="mt-1 flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className="bg-ultra-accent/20 text-ultra-accent rounded-full px-2 py-1 text-xs">
                    {lead.service}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Building2 size={14} className="mr-2" />
                    {lead.company}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Mail size={14} className="mr-2" />
                    {lead.email}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Phone size={14} className="mr-2" />
                    {lead.phone}
                  </div>
                  {lead.role && <div className="mt-2 text-xs text-gray-500">Cargo: {lead.role}</div>}
                </div>

                <div className="mt-4 border-t border-slate-700 pt-4">
                  <p className="text-xs text-gray-500">Origem: {lead.source_page || '/'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsDashboard;
