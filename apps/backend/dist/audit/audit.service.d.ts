import { Model } from 'mongoose';
import { AuditData, AuditDataDocument } from '../schemas/audit-data.schema';
export declare class AuditService {
    private auditModel;
    constructor(auditModel: Model<AuditDataDocument>);
    processExcel(file: Express.Multer.File, clientId: string, uploadedBy: string): Promise<import("mongoose").Document<unknown, {}, AuditDataDocument, {}, {}> & AuditData & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    private extractTributos;
    private calculateSummary;
    findByClient(clientId: string): Promise<(import("mongoose").Document<unknown, {}, AuditDataDocument, {}, {}> & AuditData & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, AuditDataDocument, {}, {}> & AuditData & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
