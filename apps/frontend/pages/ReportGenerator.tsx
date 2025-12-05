import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Download, Send, Loader2 } from 'lucide-react';

/**
 * ReportGenerator - Interface para Admin fazer upload de Excel do Verot
 * e gerar relatórios para clientes
 */
const ReportGenerator: React.FC = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    // Carregar lista de clientes
    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const token = localStorage.getItem('crm_token');
            const response = await fetch(`${API_URL}/api/clients`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setClients(data.data || []);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
            setResult(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedClient) {
            setError('Selecione um cliente');
            return;
        }

        if (!file) {
            setError('Selecione um arquivo Excel');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('excel', file);

            const token = localStorage.getItem('crm_token');
            const response = await fetch(`${API_URL}/api/reports/upload/${selectedClient}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao processar arquivo');
            }

            setResult(data);
            setFile(null);

            // Reset do input file
            const fileInput = document.getElementById('file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDownloadPDF = () => {
        if (result?.data?.pdf_url) {
            window.open(`${API_URL}${result.data.pdf_url}`, '_blank');
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Gerador de Relatórios
                    </h1>
                    <p className="text-gray-400">
                        Upload de Excel do Verot para gerar relatório de oportunidades
                    </p>
                </motion.div>

                {/* Form */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                    {/* Seleção de Cliente */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Cliente
                        </label>
                        <select
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-ultra-accent"
                        >
                            <option value="">Selecione um cliente...</option>
                            {clients.map((client: any) => (
                                <option key={client._id} value={client._id}>
                                    {client.company} - {client.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upload de Excel */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Arquivo Excel do Verot
                        </label>
                        <div className="relative">
                            <input
                                id="file-input"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="file-input"
                                className="flex items-center justify-center w-full p-8 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-ultra-accent transition-colors"
                            >
                                {file ? (
                                    <div className="text-center">
                                        <FileSpreadsheet className="w-12 h-12 text-ultra-accent mx-auto mb-2" />
                                        <p className="text-white font-medium">{file.name}</p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-300">Clique para selecionar arquivo</p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Formatos: .xlsx, .xls, .csv
                                        </p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start">
                            <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Button */}
                    <button
                        onClick={handleUpload}
                        disabled={uploading || !selectedClient || !file}
                        className="w-full bg-ultra-accent hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5 mr-2" />
                                Gerar Relatório
                            </>
                        )}
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 bg-green-500/10 border border-green-500/50 rounded-2xl p-8"
                    >
                        <div className="flex items-start mb-6">
                            <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                            <div>
                                <h2 className="text-xl font-bold text-green-400 mb-1">
                                    Relatório Gerado com Sucesso!
                                </h2>
                                <p className="text-gray-300 text-sm">
                                    O relatório foi processado e está pronto para download
                                </p>
                            </div>
                        </div>

                        {/* Métricas */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-gray-400 text-sm mb-1">Total Recuperável</p>
                                <p className="text-2xl font-bold text-ultra-accent">
                                    R$ {result.data.total_recoverable?.toLocaleString('pt-BR') || '0'}
                                </p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-gray-400 text-sm mb-1">Tributos Analisados</p>
                                <p className="text-2xl font-bold text-white">
                                    {result.data.tributos_count || 0}
                                </p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-gray-400 text-sm mb-1">Status</p>
                                <p className="text-2xl font-bold text-green-400">Concluído</p>
                            </div>
                        </div>

                        {/* Insights */}
                        {result.data.insights && result.data.insights.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-white font-bold mb-3">Insights:</h3>
                                <div className="space-y-2">
                                    {result.data.insights.slice(0, 3).map((insight: any, index: number) => (
                                        <div key={index} className="bg-slate-800/30 rounded-lg p-3">
                                            <p className="text-gray-300 text-sm">{insight.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleDownloadPDF}
                                className="flex-1 bg-ultra-accent hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download PDF
                            </button>
                            <button
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Enviar para Cliente
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ReportGenerator;
