const express = require('express');
const multer = require('multer');
const path = require('path');
const excelProcessor = require('../services/excelProcessor');
const pdfGenerator = require('../services/pdfGenerator');

const router = express.Router();

// Configurar multer para upload de Excel
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.xlsx' || ext === '.xls' || ext === '.csv') {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos Excel são permitidos'), false);
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

/**
 * POST /api/reports/upload/:clientId
 * Upload de Excel do Verot e geração de relatório
 * ADMIN ONLY
 */
router.post('/upload/:clientId', upload.single('excel'), async (req, res) => {
    try {
        const { clientId } = req.params;

        // Verificar se o arquivo foi enviado
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Nenhum arquivo foi enviado'
            });
        }

        console.log(`📊 Processando Excel para cliente ${clientId}...`);

        // 1. Processar Excel do Verot
        const processResult = await excelProcessor.processAuditFile(req.file.buffer);

        if (!processResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Erro ao processar Excel',
                error: processResult.error
            });
        }

        // 2. Buscar dados do cliente no banco
        const Client = req.app.get('models').Client;
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Cliente não encontrado'
            });
        }

        // 3. Gerar PDF profissional
        const pdfPath = await pdfGenerator.generateAuditReport(
            processResult.data,
            {
                company_name: client.company,
                company_id: client._id,
                cnpj: client.cnpj || 'N/A',
                contact: client.name,
                email: client.email
            }
        );

        // 4. Salvar registro no banco
        const AuditReport = req.app.get('models').AuditReport;
        const report = await AuditReport.create({
            client_id: clientId,
            company_name: client.company,
            cnpj: client.cnpj,
            audit_data: processResult.data,
            pdf_path: pdfPath,
            pdf_url: `/reports/${path.basename(pdfPath)}`,
            excel_filename: req.file.originalname,
            generated_at: new Date(),
            generated_by: req.user?.id, // Se tiver auth
            status: 'generated'
        });

        console.log(`✅ Relatório gerado: ${pdfPath}`);

        // 5. Retornar sucesso
        res.json({
            success: true,
            message: 'Relatório gerado com sucesso',
            data: {
                report_id: report._id,
                pdf_url: report.pdf_url,
                total_recoverable: processResult.data.summary.total_recoverable,
                tributos_count: processResult.data.tributos.length,
                insights: processResult.data.insights
            }
        });

    } catch (error) {
        console.error('❌ Erro ao gerar relatório:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao gerar relatório',
            error: error.message
        });
    }
});

/**
 * GET /api/reports/client/:clientId
 * Buscar todos os relatórios de um cliente
 */
router.get('/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;

        const AuditReport = req.app.get('models').AuditReport;
        const reports = await AuditReport.find({ client_id: clientId })
            .sort({ generated_at: -1 });

        res.json({
            success: true,
            data: reports
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar relatórios',
            error: error.message
        });
    }
});

/**
 * GET /api/reports/:reportId
 * Buscar um relatório específico
 */
router.get('/:reportId', async (req, res) => {
    try {
        const { reportId } = req.params;

        const AuditReport = req.app.get('models').AuditReport;
        const report = await AuditReport.findById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Relatório não encontrado'
            });
        }

        res.json({
            success: true,
            data: report
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar relatório',
            error: error.message
        });
    }
});

/**
 * GET /api/reports/pdf/:reportId
 * Download do PDF
 */
router.get('/pdf/:reportId', async (req, res) => {
    try {
        const { reportId } = req.params;

        const AuditReport = req.app.get('models').AuditReport;
        const report = await AuditReport.findById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Relatório não encontrado'
            });
        }

        // Enviar arquivo PDF
        res.download(report.pdf_path, `relatorio_${report.company_name}.pdf`);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao baixar PDF',
            error: error.message
        });
    }
});

/**
 * PATCH /api/reports/:reportId/send
 * Marcar relatório como enviado e enviar email
 */
router.patch('/:reportId/send', async (req, res) => {
    try {
        const { reportId } = req.params;

        const AuditReport = req.app.get('models').AuditReport;
        const report = await AuditReport.findById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Relatório não encontrado'
            });
        }

        // Atualizar status
        report.status = 'sent';
        report.sent_at = new Date();
        await report.save();

        // TODO: Enviar email para o cliente
        // const emailService = require('../services/emailService');
        // await emailService.sendReportEmail(report);

        res.json({
            success: true,
            message: 'Relatório marcado como enviado',
            data: report
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao enviar relatório',
            error: error.message
        });
    }
});

/**
 * DELETE /api/reports/:reportId
 * Deletar relatório (Admin)
 */
router.delete('/:reportId', async (req, res) => {
    try {
        const { reportId } = req.params;

        const AuditReport = req.app.get('models').AuditReport;
        const report = await AuditReport.findById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Relatório não encontrado'
            });
        }

        // Deletar arquivo PDF
        const fs = require('fs');
        if (fs.existsSync(report.pdf_path)) {
            fs.unlinkSync(report.pdf_path);
        }

        // Deletar registro
        await report.deleteOne();

        res.json({
            success: true,
            message: 'Relatório deletado com sucesso'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar relatório',
            error: error.message
        });
    }
});

module.exports = router;
