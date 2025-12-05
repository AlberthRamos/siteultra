import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Client, ClientDocument } from '../schemas/client.schema';
import { LeadsService } from '../leads/leads.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly leadsService: LeadsService,
  ) {}

  async create(leadId: string): Promise<Client> {
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

  async findAll(filters?: { status?: string; assigned_to?: string }) {
    const query: any = {};
    if (filters?.status) query.status = filters.status;
    if (filters?.assigned_to) query.assigned_to = filters.assigned_to;

    return this.clientModel
      .find(query)
      .populate('assigned_to', 'name email')
      .populate('lead_id')
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return this.clientModel
      .findById(id)
      .populate('assigned_to', 'name email')
      .populate('audit_data_id');
  }

  async updateStatus(id: string, status: string) {
    return this.clientModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async addNote(id: string, note: string, createdBy: string) {
    const client = await this.clientModel.findById(id);
    if (!client) throw new Error('Cliente não encontrado');

    if (!client.notes) client.notes = [];

    client.notes.push({
      date: new Date(),
      note,
      created_by: createdBy as any,
    });
    return client.save();
  }

  async assignTo(id: string, adminId: string) {
    return this.clientModel.findByIdAndUpdate(
      id,
      { assigned_to: adminId },
      { new: true },
    );
  }
}
