import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AdminUser, AdminUserDocument } from '../schemas/admin-user.schema';
import { Client, ClientDocument } from '../schemas/client.schema';
export declare class AuthService {
    private adminModel;
    private clientModel;
    private jwtService;
    constructor(adminModel: Model<AdminUserDocument>, clientModel: Model<ClientDocument>, jwtService: JwtService);
    loginAdmin(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            role: string;
        };
    }>;
    loginClient(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            company: string;
            role: string;
        };
    }>;
    createAdmin(email: string, name: string, password: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        email: string;
        name: string;
    }>;
    validateUser(payload: any): Promise<(import("mongoose").Document<unknown, {}, AdminUserDocument, {}, {}> & AdminUser & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | (import("mongoose").Document<unknown, {}, ClientDocument, {}, {}> & Client & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
