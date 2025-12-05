import { Document } from 'mongoose';
export type AdminUserDocument = AdminUser & Document;
export declare class AdminUser {
    email: string;
    password: string;
    name: string;
    is_active: boolean;
    last_login?: Date;
}
export declare const AdminUserSchema: import("mongoose").Schema<AdminUser, import("mongoose").Model<AdminUser, any, any, any, Document<unknown, any, AdminUser, any, {}> & AdminUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AdminUser, Document<unknown, {}, import("mongoose").FlatRecord<AdminUser>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AdminUser> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
