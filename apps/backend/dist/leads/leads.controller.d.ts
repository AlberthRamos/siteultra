import { LeadsService } from './leads.service';
export declare class LeadsController {
    private leadsService;
    constructor(leadsService: LeadsService);
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").LeadDocument, {}, {}> & import("../schemas/lead.schema").Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(status?: string, service?: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").LeadDocument, {}, {}> & import("../schemas/lead.schema").Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").LeadDocument, {}, {}> & import("../schemas/lead.schema").Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateStatus(id: string, status: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").LeadDocument, {}, {}> & import("../schemas/lead.schema").Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
