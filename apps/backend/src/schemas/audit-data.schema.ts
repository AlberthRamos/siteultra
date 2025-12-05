import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuditDataDocument = AuditData & Document;

/**
 * Schema de AuditData - Dados da auditoria tributária
 * Armazena os dados importados do Excel de auditoria
 */
@Schema({ timestamps: true })
export class AuditData {
    @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
    client_id: Types.ObjectId;

    // Dados estruturados da auditoria (baseado no PDF de exemplo)
    @Prop({ type: Object })
    summary: {
        total_recuperavel?: number;
        periodo_analisado?: string;
        tributos_analisados?: string[];
    };

    // Detalhamento por tributo
    @Prop({ type: [Object] })
    tributos: Array<{
        nome: string; // Ex: "ICMS", "PIS", "COFINS"
        valor_recuperavel: number;
        percentual: number;
        observacoes?: string;
    }>;

    // Dados brutos do Excel (JSON)
    @Prop({ type: Object })
    raw_data: any;

    // Arquivo original
    @Prop()
    file_name?: string;

    @Prop()
    uploaded_by?: Types.ObjectId; // Admin que fez upload

    @Prop({ default: Date.now })
    uploaded_at: Date;
}

export const AuditDataSchema = SchemaFactory.createForClass(AuditData);
