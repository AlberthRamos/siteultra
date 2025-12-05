import { Document, Types } from 'mongoose';
export type AuditDataDocument = AuditData & Document;
export declare class AuditData {
    client_id: Types.ObjectId;
    summary: {
        total_recuperavel?: number;
        periodo_analisado?: string;
        tributos_analisados?: string[];
    };
    tributos: Array<{
        nome: string;
        valor_recuperavel: number;
        percentual: number;
        observacoes?: string;
    }>;
    raw_data: any;
    file_name?: string;
    uploaded_by?: Types.ObjectId;
    uploaded_at: Date;
}
export declare const AuditDataSchema: import("mongoose").Schema<AuditData, import("mongoose").Model<AuditData, any, any, any, Document<unknown, any, AuditData, any, {}> & AuditData & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AuditData, Document<unknown, {}, import("mongoose").FlatRecord<AuditData>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AuditData> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
