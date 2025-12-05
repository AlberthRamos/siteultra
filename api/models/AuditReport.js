const mongoose = require('mongoose');

/**
 * Schema de Relatório de Auditoria
 * Armazena dados dos relatórios gerados a partir do Excel do Verot
 */
const auditReportSchema = new mongoose.Schema({
    // Identificação do Cliente
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    cnpj: String,

    // Dados da Auditoria (processados do Excel)
    audit_data: {
        summary: {
            total_recoverable: Number,
            total_taxes: Number,
            period_analyzed: String,
            generated_at: Date
        },
        tributos: [{
            tax_name: String,
            recoverable_amount: Number,
            percentage: Number,
            period: String,
            notes: String
        }],
        insights: [{
            type: String,  // 'highlight', 'opportunity', 'action'
            message: String
        }]
    },

    // Arquivos
    excel_filename: String,  // Nome do Excel original do Verot
    pdf_path: String,        // Caminho do PDF gerado
    pdf_url: String,         // URL pública do PDF

    // Controle
    generated_at: {
        type: Date,
        default: Date.now
    },
    generated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser'
    },
    sent_at: Date,
    viewed_at: Date,

    status: {
        type: String,
        enum: ['generated', 'sent', 'viewed'],
        default: 'generated'
    }
}, {
    timestamps: true
});

// Índices
auditReportSchema.index({ client_id: 1, generated_at: -1 });
auditReportSchema.index({ status: 1 });

module.exports = mongoose.model('AuditReport', auditReportSchema);
