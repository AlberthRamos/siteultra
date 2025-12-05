import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

/**
 * Schema de Lead - Captura de leads do site
 * Representa um potencial cliente que preencheu o formulário
 */
@Schema({ timestamps: true })
export class Lead {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    company: string;

    @Prop()
    role?: string;

    @Prop({ required: true })
    service: string; // 'Recuperação Tributária', 'Pentest', 'SOC'

    @Prop()
    source_page?: string;

    @Prop()
    utm_source?: string;

    @Prop()
    utm_medium?: string;

    @Prop()
    utm_campaign?: string;

    @Prop()
    ip_address?: string;

    @Prop()
    user_agent?: string;

    @Prop({
        type: String,
        enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
        default: 'new'
    })
    status: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
