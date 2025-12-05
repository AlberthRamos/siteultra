import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as XLSX from 'xlsx';
import { AuditData, AuditDataDocument } from '../schemas/audit-data.schema';

/**
 * AuditService - Gerencia dados de auditoria
 * Processa Excel e gera dashboard
 */
@Injectable()
export class AuditService {
    constructor(
        @InjectModel(AuditData.name) private auditModel: Model<AuditDataDocument>,
    ) { }

    /**
     * Processar arquivo Excel e salvar dados
     */
    async processExcel(file: Express.Multer.File, clientId: string, uploadedBy: string) {
        // Ler Excel
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        // Processar dados (exemplo - ajustar conforme estrutura real do Excel)
        const tributos = this.extractTributos(rawData);
        const summary = this.calculateSummary(tributos);

        // Salvar no banco
        const auditData = new this.auditModel({
            client_id: clientId,
            summary,
            tributos,
            raw_data: rawData,
            file_name: file.originalname,
            uploaded_by: uploadedBy,
            uploaded_at: new Date(),
        });

        return auditData.save();
    }

    /**
     * Extrair tributos do Excel
     * NOTA: Ajustar conforme estrutura real do Excel
     */
    private extractTributos(rawData: any[]): any[] {
        // Exemplo de extração - ajustar conforme colunas reais
        return rawData.map((row: any) => ({
            nome: row['Tributo'] || row['Nome'],
            valor_recuperavel: parseFloat(row['Valor'] || row['Recuperável'] || 0),
            percentual: parseFloat(row['Percentual'] || row['%'] || 0),
            observacoes: row['Observações'] || row['Obs'] || '',
        }));
    }

    /**
     * Calcular resumo da auditoria
     */
    private calculateSummary(tributos: any[]) {
        const total = tributos.reduce((sum, t) => sum + t.valor_recuperavel, 0);
        const nomes = tributos.map(t => t.nome);

        return {
            total_recuperavel: total,
            periodo_analisado: '2020-2024', // Ajustar conforme Excel
            tributos_analisados: nomes,
        };
    }

    /**
     * Buscar dados de auditoria por cliente
     */
    async findByClient(clientId: string) {
        return this.auditModel.findOne({ client_id: clientId });
    }

    /**
     * Buscar dados de auditoria por ID
     */
    async findOne(id: string) {
        return this.auditModel.findById(id).populate('client_id');
    }
}
