import { Document } from 'mongoose';
export type LeadDocument = Lead & Document;
export declare class Lead {
    name: string;
    email: string;
    phone: string;
    company: string;
    cnpj?: string;
    role?: string;
    service: string;
    source_page?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    ip_address?: string;
    user_agent?: string;
    status: string;
}
export declare const LeadSchema: import("mongoose").Schema<Lead, import("mongoose").Model<Lead, any, any, any, Document<unknown, any, Lead, any, {}> & Lead & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lead, Document<unknown, {}, import("mongoose").FlatRecord<Lead>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Lead> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
