"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("../schemas/client.schema");
const leads_service_1 = require("../leads/leads.service");
let ClientsService = class ClientsService {
    clientModel;
    leadsService;
    constructor(clientModel, leadsService) {
        this.clientModel = clientModel;
        this.leadsService = leadsService;
    }
    async create(leadId) {
        const lead = await this.leadsService.findOne(leadId);
        if (!lead) {
            throw new Error('Lead not found');
        }
        const client = new this.clientModel({
            company_name: lead.company,
            contact_name: lead.name,
            email: lead.email,
            phone: lead.phone,
            cnpj: lead.cnpj,
            status: 'active',
            lead_id: lead._id,
        });
        return client.save();
    }
    async findAll(filters) {
        const query = {};
        if (filters?.status)
            query.status = filters.status;
        if (filters?.assigned_to)
            query.assigned_to = filters.assigned_to;
        return this.clientModel
            .find(query)
            .populate('assigned_to', 'name email')
            .populate('lead_id')
            .sort({ createdAt: -1 });
    }
    async findOne(id) {
        return this.clientModel
            .findById(id)
            .populate('assigned_to', 'name email')
            .populate('audit_data_id');
    }
    async updateStatus(id, status) {
        return this.clientModel.findByIdAndUpdate(id, { status }, { new: true });
    }
    async addNote(id, note, createdBy) {
        const client = await this.clientModel.findById(id);
        if (!client)
            throw new Error('Cliente não encontrado');
        if (!client.notes)
            client.notes = [];
        client.notes.push({
            date: new Date(),
            note,
            created_by: createdBy,
        });
        return client.save();
    }
    async assignTo(id, adminId) {
        return this.clientModel.findByIdAndUpdate(id, { assigned_to: adminId }, { new: true });
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        leads_service_1.LeadsService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map