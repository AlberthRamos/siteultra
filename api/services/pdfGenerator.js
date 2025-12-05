const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * PDFGenerator - Gera relatórios profissionais em PDF
 * Template baseado em análise tributária
 */
class PDFGenerator {
    constructor() {
        this.colors = {
            primary: '#00A8E8',    // Azul Ultra
            secondary: '#003459',  // Azul escuro
            success: '#00C49A',    // Verde
            text: '#333333',
            lightGray: '#F5F5F5'
        };
    }

    /**
     * Gerar relatório completo de auditoria
     * @param {Object} auditData - Dados da auditoria
     * @param {Object} clientData - Dados do cliente
     * @returns {Promise<string>} Caminho do PDF gerado
     */
    async generateAuditReport(auditData, clientData) {
        return new Promise((resolve, reject) => {
            try {
                // Criar diretório de relatórios se não existir
                const reportsDir = path.join(__dirname, '../reports');
                if (!fs.existsSync(reportsDir)) {
                    fs.mkdirSync(reportsDir, { recursive: true });
                }

                // Nome do arquivo
                const filename = `relatorio_${clientData.company_id}_${Date.now()}.pdf`;
                const filepath = path.join(reportsDir, filename);

                // Criar documento PDF
                const doc = new PDFDocument({
                    size: 'A4',
                    margins: { top: 50, bottom: 50, left: 50, right: 50 }
                });

                // Stream para arquivo
                const stream = fs.createWriteStream(filepath);
                doc.pipe(stream);

                // Gerar conteúdo do PDF
                this.addCoverPage(doc, clientData, auditData);
                this.addExecutiveSummary(doc, auditData);
                this.addDetailedAnalysis(doc, auditData);
                this.addRecommendations(doc, auditData);
                this.addNextSteps(doc);

                // Finalizar
                doc.end();

                stream.on('finish', () => {
                    resolve(filepath);
                });

                stream.on('error', (error) => {
                    reject(error);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Página de Capa
     */
    addCoverPage(doc, clientData, auditData) {
        // Header com logo (simular logo com retângulo azul)
        doc.rect(0, 0, doc.page.width, 150).fill(this.colors.primary);

        // Título
        doc.fillColor('white')
            .fontSize(32)
            .font('Helvetica-Bold')
            .text('ULTRA TAX', 50, 40, { align: 'center' });

        doc.fontSize(18)
            .font('Helvetica')
            .text('Relatório de Auditoria Tributária', 50, 85, { align: 'center' });

        // Dados do cliente
        doc.fillColor(this.colors.text)
            .fontSize(12)
            .font('Helvetica')
            .text(`Cliente: ${clientData.company_name}`, 50, 200);

        doc.text(`CNPJ: ${clientData.cnpj || 'N/A'}`, 50, 220);

        doc.text(`Período Analisado: ${auditData.summary.period_analyzed}`, 50, 240);

        doc.text(`Data do Relatório: ${new Date().toLocaleDateString('pt-BR')}`, 50, 260);

        // Valor Total em Destaque
        doc.rect(50, 320, doc.page.width - 100, 120)
            .fillAndStroke(this.colors.lightGray, this.colors.primary);

        doc.fillColor(this.colors.secondary)
            .fontSize(14)
            .font('Helvetica-Bold')
            .text('TOTAL RECUPERÁVEL', 50, 340, { align: 'center' });

        doc.fontSize(36)
            .fillColor(this.colors.success)
            .text(
                `R$ ${auditData.summary.total_recoverable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                50, 370,
                { align: 'center' }
            );

        // Nova página
        doc.addPage();
    }

    /**
     * Sumário Executivo
     */
    addExecutiveSummary(doc, auditData) {
        doc.fillColor(this.colors.primary)
            .fontSize(20)
            .font('Helvetica-Bold')
            .text('Sumário Executivo', 50, 50);

        doc.moveDown();

        doc.fillColor(this.colors.text)
            .fontSize(12)
            .font('Helvetica')
            .text(
                `Este relatório apresenta os resultados da análise tributária realizada pela Ultra Tax. ` +
                `Foram identificadas oportunidades de recuperação fiscal no valor total de ` +
                `R$ ${auditData.summary.total_recoverable.toLocaleString('pt-BR')}.`,
                { align: 'justify' }
            );

        doc.moveDown();

        // Resumo dos tributos
        doc.fontSize(14)
            .font('Helvetica-Bold')
            .text('Tributos Analisados:', 50);

        doc.moveDown(0.5);

        auditData.tributos.slice(0, 5).forEach((tributo, index) => {
            doc.fontSize(11)
                .font('Helvetica')
                .text(
                    `• ${tributo.tax_name}: R$ ${tributo.recoverable_amount.toLocaleString('pt-BR')} (${tributo.percentage}%)`,
                    60
                );
            doc.moveDown(0.3);
        });

        doc.addPage();
    }

    /**
     * Análise Detalhada
     */
    addDetailedAnalysis(doc, auditData) {
        doc.fillColor(this.colors.primary)
            .fontSize(20)
            .font('Helvetica-Bold')
            .text('Análise Detalhada', 50, 50);

        doc.moveDown();

        // Tabela de tributos
        let y = 100;

        // Cabeçalho da tabela
        doc.rect(50, y, doc.page.width - 100, 25).fill(this.colors.secondary);

        doc.fillColor('white')
            .fontSize(10)
            .font('Helvetica-Bold')
            .text('Tributo', 60, y + 8)
            .text('Valor Recuperável', 250, y + 8)
            .text('Percentual', 420, y + 8);

        y += 25;

        // Linhas da tabela
        auditData.tributos.forEach((tributo, index) => {
            // Alternar cores de fundo
            const bgColor = index % 2 === 0 ? '#FFFFFF' : this.colors.lightGray;
            doc.rect(50, y, doc.page.width - 100, 20).fill(bgColor);

            doc.fillColor(this.colors.text)
                .fontSize(9)
                .font('Helvetica')
                .text(tributo.tax_name || 'N/A', 60, y + 6)
                .text(`R$ ${tributo.recoverable_amount.toLocaleString('pt-BR')}`, 250, y + 6)
                .text(`${tributo.percentage}%`, 420, y + 6);

            y += 20;

            // Nova página se necessário
            if (y > doc.page.height - 100) {
                doc.addPage();
                y = 50;
            }
        });

        doc.addPage();
    }

    /**
     * Recomendações
     */
    addRecommendations(doc, auditData) {
        doc.fillColor(this.colors.primary)
            .fontSize(20)
            .font('Helvetica-Bold')
            .text('Recomendações', 50, 50);

        doc.moveDown();

        // Insights
        auditData.insights.forEach((insight, index) => {
            doc.fontSize(11)
                .font('Helvetica-Bold')
                .fillColor(this.colors.secondary)
                .text(`${index + 1}. ${insight.type.toUpperCase()}`, 50);

            doc.moveDown(0.3);

            doc.fontSize(10)
                .font('Helvetica')
                .fillColor(this.colors.text)
                .text(insight.message, 60, { align: 'justify' });

            doc.moveDown();
        });
    }

    /**
     * Próximos Passos
     */
    addNextSteps(doc) {
        doc.addPage();

        doc.fillColor(this.colors.primary)
            .fontSize(20)
            .font('Helvetica-Bold')
            .text('Próximos Passos', 50, 50);

        doc.moveDown();

        const steps = [
            'Análise jurídica dos créditos identificados',
            'Preparação da documentação necessária',
            'Protocolo dos pedidos de recuperação',
            'Acompanhamento junto aos órgãos competentes',
            'Recebimento dos valores'
        ];

        steps.forEach((step, index) => {
            doc.fontSize(11)
                .fillColor(this.colors.text)
                .font('Helvetica')
                .text(`${index + 1}. ${step}`, 60);
            doc.moveDown(0.5);
        });

        // Rodapé
        doc.moveDown(3);

        doc.fontSize(10)
            .fillColor(this.colors.secondary)
            .font('Helvetica-Bold')
            .text('Ultra Tax - Inteligência Tributária', 50, doc.page.height - 100, { align: 'center' });

        doc.fontSize(9)
            .font('Helvetica')
            .text('www.ultrasystems.com.br | contato@ultrasystems.com.br', { align: 'center' });
    }
}

module.exports = new PDFGenerator();
