import { AuditService } from './audit.service';
export declare class AuditController {
    private auditService;
    constructor(auditService: AuditService);
    uploadExcel(clientId: string, file: Express.Multer.File, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/audit-data.schema").AuditDataDocument, {}, {}> & import("../schemas/audit-data.schema").AuditData & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getByClient(clientId: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/audit-data.schema").AuditDataDocument, {}, {}> & import("../schemas/audit-data.schema").AuditData & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/audit-data.schema").AuditDataDocument, {}, {}> & import("../schemas/audit-data.schema").AuditData & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
