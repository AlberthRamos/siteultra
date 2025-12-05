import { Model } from 'mongoose';
import { Lead, LeadDocument } from '../schemas/lead.schema';
export declare class LeadsService {
    private leadModel;
    constructor(leadModel: Model<LeadDocument>);
    create(leadData: Partial<Lead>): Promise<import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(filters?: {
        status?: string;
        service?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateStatus(id: string, status: string): Promise<(import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
