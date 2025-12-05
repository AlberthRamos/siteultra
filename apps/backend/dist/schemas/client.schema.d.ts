import { Document, Types } from 'mongoose';
export type ClientDocument = Client & Document;
export declare class Client {
    name: string;
    email: string;
    phone: string;
    company: string;
    cnpj?: string;
    password: string;
    status: string;
    assigned_to?: Types.ObjectId;
    lead_id?: Types.ObjectId;
    audit_data_id?: Types.ObjectId;
    notes?: Array<{
        date: Date;
        note: string;
        created_by: Types.ObjectId;
    }>;
    is_active: boolean;
}
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, Document<unknown, any, Client, any, {}> & Client & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, Document<unknown, {}, import("mongoose").FlatRecord<Client>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Client> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
