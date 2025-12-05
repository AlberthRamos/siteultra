import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, DollarSign, FileText, CheckCircle, BarChart2, PieChart } from 'lucide-react';

// Mock Data - To be replaced with data from "Apresentação_Primeira_Análise ultra.pdf"
const MOCK_ANALYSIS = {
    companyName: "Empresa Exemplo Ltda",
    cnpj: "12.345.678/0001-90",
    period: "Jan 2020 - Dez 2024",
    regime: "Lucro Real",
    totalRevenue: 150000000,
    estimatedRecovery: 2500000,
    taxBreakdown: [
        { name: 'PIS/COFINS Monofásico', value: 1200000, color: '#3b82f6' },
        { name: 'ICMS ST', value: 800000, color: '#10b981' },
        { name: 'Verbas Indenizatórias', value: 500000, color: '#f59e0b' },
    ],
    riskLevel: 'Baixo',
    opportunities: [
        'Exclusão do ICMS da base de cálculo do PIS/COFINS',
        'Créditos sobre insumos energéticos',
        'Revisão de alíquotas de produtos monofásicos'
    ]
};

const FirstAnalysisDashboard: React.FC = () => {
    return (
        <div className="space-y-6 text-slate-300">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-xl bg-slate-800/50 p-6 border border-slate-700 backdrop-blur-sm"
            >
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FileText className="text-ultra-accent" />
                        Primeira Análise Tributária
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Visão geral de oportunidades e riscos identificados inicialmente.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">Empresa Analisada</p>
                    <p className="font-semibold text-white">{MOCK_ANALYSIS.companyName}</p>
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded text-gray-300">{MOCK_ANALYSIS.cnpj}</span>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-800/50 p-6 rounded-xl border border-slate-700"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Estimativa de Recuperação</h3>
                        <DollarSign className="text-emerald-400 w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                        R$ {MOCK_ANALYSIS.estimatedRecovery.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-emerald-400 mt-2 flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        Potencial Elevado
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-800/50 p-6 rounded-xl border border-slate-700"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Faturamento Analisado</h3>
                        <BarChart2 className="text-blue-400 w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                        R$ {MOCK_ANALYSIS.totalRevenue.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Período: {MOCK_ANALYSIS.period}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-800/50 p-6 rounded-xl border border-slate-700"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 font-medium">Nível de Risco</h3>
                        <AlertTriangle className="text-yellow-400 w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold text-white">{MOCK_ANALYSIS.riskLevel}</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Compliance em conformidade
                    </p>
                </motion.div>
            </div>

            {/* Breakdown & Opportunities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Tax Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 p-6 rounded-xl border border-slate-700"
                >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <PieChart className="text-ultra-accent" />
                        Composição dos Créditos
                    </h3>
                    <div className="space-y-4">
                        {MOCK_ANALYSIS.taxBreakdown.map((item, index) => (
                            <div key={index} className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-ultra-primary bg-ultra-primary/10">
                                            {item.name}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-white">
                                            {((item.value / MOCK_ANALYSIS.estimatedRecovery) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-700">
                                    <div style={{ width: `${(item.value / MOCK_ANALYSIS.estimatedRecovery) * 100}%`, backgroundColor: item.color }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                                </div>
                                <p className="text-right text-sm text-gray-400">R$ {item.value.toLocaleString('pt-BR')}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Opportunities List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800/50 p-6 rounded-xl border border-slate-700"
                >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="text-green-400" />
                        Oportunidades Mapeadas
                    </h3>
                    <ul className="space-y-3">
                        {MOCK_ANALYSIS.opportunities.map((opp, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                                <div className="mt-1 min-w-[20px]">
                                    <div className="w-2 h-2 rounded-full bg-ultra-accent" />
                                </div>
                                <span className="text-gray-300 text-sm leading-relaxed">{opp}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 pt-6 border-t border-slate-700">
                        <button className="w-full py-3 bg-ultra-primary/20 hover:bg-ultra-primary/40 text-ultra-accent border border-ultra-primary/50 hover:border-ultra-primary rounded-lg transition-all font-semibold text-sm">
                            Baixar Relatório Detalhado (PDF)
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FirstAnalysisDashboard;
