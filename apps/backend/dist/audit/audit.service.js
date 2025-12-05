"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const XLSX = __importStar(require("xlsx"));
const audit_data_schema_1 = require("../schemas/audit-data.schema");
let AuditService = class AuditService {
    auditModel;
    constructor(auditModel) {
        this.auditModel = auditModel;
    }
    async processExcel(file, clientId, uploadedBy) {
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet);
        const tributos = this.extractTributos(rawData);
        const summary = this.calculateSummary(tributos);
        const auditData = new this.auditModel({
            client_id: clientId,
            summary,
            tributos,
            raw_data: rawData,
            file_name: file.originalname,
            uploaded_by: uploadedBy,
            uploaded_at: new Date(),
        });
        return auditData.save();
    }
    extractTributos(rawData) {
        return rawData.map((row) => ({
            nome: row['Tributo'] || row['Nome'],
            valor_recuperavel: parseFloat(row['Valor'] || row['Recuperável'] || 0),
            percentual: parseFloat(row['Percentual'] || row['%'] || 0),
            observacoes: row['Observações'] || row['Obs'] || '',
        }));
    }
    calculateSummary(tributos) {
        const total = tributos.reduce((sum, t) => sum + t.valor_recuperavel, 0);
        const nomes = tributos.map(t => t.nome);
        return {
            total_recuperavel: total,
            periodo_analisado: '2020-2024',
            tributos_analisados: nomes,
        };
    }
    async findByClient(clientId) {
        return this.auditModel.findOne({ client_id: clientId });
    }
    async findOne(id) {
        return this.auditModel.findById(id).populate('client_id');
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(audit_data_schema_1.AuditData.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuditService);
//# sourceMappingURL=audit.service.js.map