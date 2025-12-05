import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClientDocument = Client & Document;

/**
 * Schema de Client - Cliente do CRM Ultra Tax
 * Representa um cliente que está em processo de auditoria/negociação
 */
@Schema({ timestamps: true })
export class Client {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    company: string;

    @Prop()
    cnpj?: string;

    // Credenciais para acesso ao portal do cliente
    @Prop({ required: true })
    password: string; // Hash bcrypt

    // Status do cliente no funil de vendas
    @Prop({
        type: String,
        enum: ['negotiation', 'audit', 'report_sent', 'contract_signed', 'lost'],
        default: 'negotiation'
    })
    status: string;

    // Vendedor responsável
    @Prop({ type: Types.ObjectId, ref: 'AdminUser' })
    assigned_to?: Types.ObjectId;

    // Link do Lead original (se veio de um lead)
    @Prop({ type: Types.ObjectId, ref: 'Lead' })
    lead_id?: Types.ObjectId;

    // Dados de auditoria (referência)
    @Prop({ type: Types.ObjectId, ref: 'AuditData' })
    audit_data_id?: Types.ObjectId;

    // Timeline de anotações
    @Prop({
        type: [{
            date: Date,
            note: String,
            created_by: { type: Types.ObjectId, ref: 'AdminUser' }
        }]
    })
    notes?: Array<{
        date: Date;
        note: string;
        created_by: Types.ObjectId;
    }>;

    @Prop({ default: true })
    is_active: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
