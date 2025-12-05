"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
let ClientsService = class ClientsService {
    is_active;
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)()
], ClientsService);
;
return client.save();
async;
findAll(filters ?  : { status: string, assigned_to: string });
{
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
async;
findOne(id, string);
{
    return this.clientModel
        .findById(id)
        .populate('assigned_to', 'name email')
        .populate('audit_data_id');
}
async;
updateStatus(id, string, status, string);
{
    return this.clientModel.findByIdAndUpdate(id, { status }, { new: true });
}
async;
addNote(id, string, note, string, createdBy, string);
{
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
async;
assignTo(id, string, adminId, string);
{
    return this.clientModel.findByIdAndUpdate(id, { assigned_to: adminId }, { new: true });
}
//# sourceMappingURL=clients.service.js.map