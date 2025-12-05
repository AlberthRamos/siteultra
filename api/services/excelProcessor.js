const XLSX = require('xlsx');
const path = require('path');

/**
 * ExcelProcessor - Processa planilhas de auditoria tributária
 * Extrai dados estruturados para geração de relatórios
 */
class ExcelProcessor {
    constructor() {
        this.supportedExtensions = ['.xlsx', '.xls', '.csv'];
    }

    /**
     * Processar arquivo Excel de auditoria
     * @param {Buffer|string} file - Buffer do arquivo ou caminho
     * @returns {Object} Dados estruturados da auditoria
     */
    async processAuditFile(file) {
        try {
            // Ler o arquivo
            const workbook = typeof file === 'string'
                ? XLSX.readFile(file)
                : XLSX.read(file, { type: 'buffer' });

            // Pegar a primeira planilha
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Converter para JSON
            const rawData = XLSX.utils.sheet_to_json(sheet);

            // Processar e estruturar dados
            const structured = this.structureAuditData(rawData);

            return {
                success: true,
                data: structured,
                metadata: {
                    totalRows: rawData.length,
                    sheetName,
                    processedAt: new Date()
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Estruturar dados da auditoria
     * @param {Array} rawData - Dados brutos do Excel
     * @returns {Object} Dados estruturados
     */
    structureAuditData(rawData) {
        // Mapa de colunas comuns (ajustar conforme Excel real)
        const columnMap = {
            'Tributo': 'tax_name',
            'Valor Recuperável': 'recoverable_amount',
            'Percentual': 'percentage',
            'Período': 'period',
            'Observações': 'notes',
            'Tipo': 'tax_type'
        };

        const tributos = [];
        let totalRecuperable = 0;

        rawData.forEach(row => {
            const tributo = {};

            // Mapear colunas
            Object.keys(row).forEach(key => {
                const mappedKey = this.findColumnMapping(key, columnMap);
                if (mappedKey) {
                    tributo[mappedKey] = row[key];
                }
            });

            // Converter valores monetários
            if (tributo.recoverable_amount) {
                tributo.recoverable_amount = this.parseMoneyValue(tributo.recoverable_amount);
                totalRecuperable += tributo.recoverable_amount;
            }

            // Converter percentual
            if (tributo.percentage) {
                tributo.percentage = this.parsePercentValue(tributo.percentage);
            }

            tributos.push(tributo);
        });

        return {
            summary: {
                total_recoverable: totalRecuperable,
                total_taxes: tributos.length,
                period_analyzed: this.extractPeriod(rawData),
                generated_at: new Date()
            },
            tributos,
            insights: this.generateInsights(tributos, totalRecuperable)
        };
    }

    /**
     * Encontrar mapeamento de coluna (flexível)
     */
    findColumnMapping(columnName, map) {
        const normalized = columnName.trim().toLowerCase();
        for (const [key, value] of Object.entries(map)) {
            if (normalized.includes(key.toLowerCase())) {
                return value;
            }
        }
        return null;
    }

    /**
     * Converter valor monetário
     */
    parseMoneyValue(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            // Remove R$, pontos e vírgulas
            const cleaned = value
                .replace(/R\$/, '')
                .replace(/\./g, '')
                .replace(/,/, '.')
                .trim();
            return parseFloat(cleaned) || 0;
        }
        return 0;
    }

    /**
     * Converter percentual
     */
    parsePercentValue(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            const cleaned = value.replace(/%/, '').trim();
            return parseFloat(cleaned) || 0;
        }
        return 0;
    }

    /**
     * Extrair período da auditoria
     */
    extractPeriod(data) {
        // Tentar encontrar período nos dados
        const firstRow = data[0];
        if (firstRow && firstRow.Período) {
            return firstRow.Período;
        }
        // Default: últimos 5 anos
        const currentYear = new Date().getFullYear();
        return `${currentYear - 5} - ${currentYear}`;
    }

    /**
     * Gerar insights automáticos com IA
     */
    generateInsights(tributos, total) {
        const insights = [];

        // Encontrar tributo com maior valor
        const maxTributo = tributos.reduce((max, t) =>
            (t.recoverable_amount > max.recoverable_amount) ? t : max
            , tributos[0]);

        insights.push({
            type: 'highlight',
            message: `O tributo ${maxTributo.tax_name} representa a maior oportunidade de recuperação: R$ ${maxTributo.recoverable_amount.toLocaleString('pt-BR')}`
        });

        // Verificar se há oportunidades significativas
        if (total > 100000) {
            insights.push({
                type: 'opportunity',
                message: `Total recuperável de R$ ${total.toLocaleString('pt-BR')} - excelente oportunidade de otimização fiscal`
            });
        }

        // Sugerir ações
        insights.push({
            type: 'action',
            message: 'Recomendamos iniciar o processo de recuperação imediatamente para maximizar o retorno'
        });

        return insights;
    }

    /**
     * Validar arquivo Excel
     */
    validateFile(filename) {
        const ext = path.extname(filename).toLowerCase();
        return this.supportedExtensions.includes(ext);
    }
}

module.exports = new ExcelProcessor();
