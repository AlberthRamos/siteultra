import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, LogOut, UserPlus, Users, TrendingUp, Calendar, Building2, Mail, Phone, Filter, PieChart } from 'lucide-react';
import CRMLogin from './CRMLogin';
import FirstAnalysisDashboard from './FirstAnalysisDashboard';
import ReportGenerator from './ReportGenerator';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role?: string;
  service: string;
  status: string;
  created_at: string;
  source_page?: string;
}

const UltraCRM: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'reports' | 'analysis'>('leads');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const savedToken = localStorage.getItem('crm_token');
    const savedUser = localStorage.getItem('crm_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && token && activeTab === 'leads') {
      loadLeads();
    }
  }, [isAuthenticated, token, activeTab]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/crm/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          return;
        }
        setLeads([]);
        console.warn('Could not load leads');
      } else {
        const data = await response.json();
        setLeads(data.data || []);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (newToken: string, newUser: any) => {
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/api/crm/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        loadLeads();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const exportCSV = () => {
    const csv = leadsToCSV(filteredLeads);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-ultra-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const leadsToCSV = (data: Lead[]): string => {
    if (data.length === 0) return '';
    const headers = 'Nome,Email,Telefone,Empresa,Cargo,Serviço,Status,Data\n';
    const rows = data
      .map(
        (lead) =>
          `"${lead.name}","${lead.email}","${lead.phone}","${lead.company}","${lead.role || ''}","${lead.service}","${lead.status}","${new Date(lead.created_at).toLocaleDateString('pt-BR')}"`,
      )
      .join('\n');
    return headers + rows;
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    converted: leads.filter((l) => l.status === 'converted').length,
  };

  if (!isAuthenticated) {
    return <CRMLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-ultra-dark min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-white">Ultra CRM</h1>
                <p className="text-sm text-gray-400">Bem-vindo, {user?.name}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex space-x-1 rounded-lg bg-slate-800 p-1">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === 'leads' ? 'bg-ultra-primary text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Users size={16} />
                  <span>Leads</span>
                </button>
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === 'analysis' ? 'bg-ultra-primary text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <TrendingUp size={16} />
                  <span>Primeira Análise</span>
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === 'reports' ? 'bg-ultra-primary text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <PieChart size={16} />
                  <span>Relatórios & Dados</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 rounded-lg bg-red-600/10 px-4 py-2 text-red-500 transition-colors hover:bg-red-600/20"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {activeTab === 'leads' ? (
          <>
            {/* Stats */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total de Leads</p>
                    <p className="mt-1 text-3xl font-bold text-white">{stats.total}</p>
                  </div>
                  <TrendingUp className="text-ultra-accent h-10 w-10" />
                </div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Novos</p>
                    <p className="mt-1 text-3xl font-bold text-yellow-400">{stats.new}</p>
                  </div>
                  <Calendar className="h-10 w-10 text-yellow-400" />
                </div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Contatados</p>
                    <p className="mt-1 text-3xl font-bold text-blue-400">{stats.contacted}</p>
                  </div>
                  <Phone className="h-10 w-10 text-blue-400" />
                </div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Convertidos</p>
                    <p className="mt-1 text-3xl font-bold text-green-400">{stats.converted}</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-green-400" />
                </div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex space-x-2">
                {['all', 'new', 'contacted', 'qualified', 'converted', 'lost'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${filter === f ? 'bg-ultra-accent text-white' : 'bg-slate-800 text-gray-400 hover:text-white'
                      }`}
                  >
                    {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={exportCSV}
                className="bg-ultra-accent flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors hover:bg-cyan-600"
              >
                <Download size={18} />
                <span>Exportar CSV</span>
              </button>
            </div>

            {/* Leads Table */}
            <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Nome
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Empresa
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Contato
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Serviço
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredLeads.map((lead) => (
                      <tr key={lead._id} className="transition-colors hover:bg-slate-700/30">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-white">{lead.name}</div>
                            {lead.role && <div className="text-sm text-gray-400">{lead.role}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{lead.company}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-gray-300">{lead.email}</div>
                            <div className="text-gray-400">{lead.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-ultra-accent/20 text-ultra-accent rounded-full px-2 py-1 text-xs">
                            {lead.service}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                            className="focus:border-ultra-accent rounded border border-slate-600 bg-slate-700 px-2 py-1 text-sm text-white focus:outline-none"
                          >
                            <option value="new">Novo</option>
                            <option value="contacted">Contatado</option>
                            <option value="qualified">Qualificado</option>
                            <option value="converted">Convertido</option>
                            <option value="lost">Perdido</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeTab === 'analysis' ? (
          <div>
            <FirstAnalysisDashboard />
          </div>
        ) : (
          /* Report Generator Tab */
          <div>
            <ReportGenerator />
          </div>
        )}
      </div>
    </div>
  );
};

export default UltraCRM;
