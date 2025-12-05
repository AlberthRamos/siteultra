/**
 * COMPONENTE DE UPLOAD DE EXCEL VEROT
 * 
 * Permite que o auditor faça upload do arquivo Excel exportado do Verot
 * e gera automaticamente a "Primeira Análise" para o cliente.
 */

import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    LinearProgress,
    Alert,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import {
    Upload,
    FileSpreadsheet,
    CheckCircle,
    AlertCircle,
    TrendingUp
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

interface UploadVerotExcelProps {
    onAnalysisGenerated: (data: any) => void;
    clientId?: string;
}

export default function UploadVerotExcel({ onAnalysisGenerated, clientId }: UploadVerotExcelProps) {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            if (clientId) formData.append('clientId', clientId);

            const response = await fetch('/api/tax/upload-verot-excel', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erro ao processar arquivo');
            }

            return response.json();
        },
        onSuccess: (data) => {
            onAnalysisGenerated(data.data);
        },
    });

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Validar extensão
        const validExtensions = ['.xlsx', '.xls', '.csv'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            alert('Por favor, selecione um arquivo Excel (.xlsx, .xls ou .csv)');
            return;
        }

        setFile(file);
    };

    const handleUpload = () => {
        if (file) {
            uploadMutation.mutate(file);
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileSpreadsheet />
                Upload de Análise Verot
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Faça upload do arquivo Excel exportado do sistema Verot (SpedAdvisor) para gerar automaticamente
                a Primeira Análise para o cliente.
            </Typography>

            {/* Área de Upload */}
            <Paper
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: dragActive ? 'primary.main' : 'divider',
                    bgcolor: dragActive ? 'action.hover' : 'background.paper',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                    },
                }}
            >
                <input
                    type="file"
                    id="file-upload"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />

                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                    <Upload size={48} style={{ margin: '0 auto', color: '#00f2ff' }} />

                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {file ? file.name : 'Arraste o arquivo Excel aqui'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        ou clique para selecionar
                    </Typography>

                    {file && (
                        <Chip
                            label={`${(file.size / 1024).toFixed(2)} KB`}
                            size="small"
                            sx={{ mt: 2 }}
                        />
                    )}
                </label>
            </Paper>

            {/* Tipos de Análise Suportados */}
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Tipos de Análise Suportados:
                </Typography>
                <List dense>
                    {[
                        'ICMS na base de PIS/COFINS',
                        'Ressarcimento de ICMS-ST',
                        'Créditos de PIS/COFINS sobre insumos',
                        'Análise Previdenciária (INSS)',
                        'eCredAc (Crédito Acumulado ICMS)',
                    ].map((tipo, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <CheckCircle size={20} color="#10b981" />
                            </ListItemIcon>
                            <ListItemText primary={tipo} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Botão de Upload */}
            {file && (
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleUpload}
                    disabled={uploadMutation.isPending}
                    startIcon={<TrendingUp />}
                    sx={{ mt: 3 }}
                >
                    {uploadMutation.isPending ? 'Processando...' : 'Gerar Primeira Análise'}
                </Button>
            )}

            {/* Loading */}
            {uploadMutation.isPending && (
                <Box sx={{ mt: 2 }}>
                    <LinearProgress />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                        Analisando arquivo Excel... Isso pode levar alguns segundos.
                    </Typography>
                </Box>
            )}

            {/* Erro */}
            {uploadMutation.isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    <AlertCircle size={20} />
                    Erro ao processar arquivo. Verifique se o formato está correto.
                </Alert>
            )}

            {/* Sucesso */}
            {uploadMutation.isSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    <CheckCircle size={20} />
                    Análise gerada com sucesso! Redirecionando para o dashboard...
                </Alert>
            )}

            {/* Instruções */}
            <Paper sx={{ p: 3, mt: 3, bgcolor: 'info.dark' }}>
                <Typography variant="subtitle2" gutterBottom>
                    📋 Instruções:
                </Typography>
                <Typography variant="body2" component="div">
                    <ol style={{ paddingLeft: 20, margin: 0 }}>
                        <li>Exporte o relatório do Verot (SpedAdvisor) em formato Excel</li>
                        <li>Faça upload do arquivo aqui</li>
                        <li>O sistema irá automaticamente:
                            <ul>
                                <li>Detectar o tipo de análise</li>
                                <li>Extrair dados e calcular totalizadores</li>
                                <li>Gerar gráficos e KPIs</li>
                                <li>Criar a Primeira Análise para apresentação ao cliente</li>
                            </ul>
                        </li>
                    </ol>
                </Typography>
            </Paper>
        </Box>
    );
}
