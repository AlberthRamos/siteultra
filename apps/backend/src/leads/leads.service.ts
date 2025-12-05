import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from '../schemas/lead.schema';

/**
 * LeadsService - Gerencia leads capturados do site
 */
@Injectable()
export class LeadsService {
    constructor(@InjectModel(Lead.name) private leadModel: Model<LeadDocument>) { }

    /**
     * Criar novo lead (público - formulário do site)
     */
    async create(leadData: Partial<Lead>) {
        const lead = new this.leadModel(leadData);
        return lead.save();
    }

    /**
     * Listar todos os leads (Admin)
     */
    async findAll(filters?: { status?: string; service?: string }) {
        const query: any = {};
        if (filters?.status) query.status = filters.status;
        if (filters?.service) query.service = filters.service;

        return this.leadModel.find(query).sort({ createdAt: -1 });
    }

    /**
     * Buscar lead por ID
     */
    async findOne(id: string) {
        return this.leadModel.findById(id);
    }

    /**
     * Atualizar status do lead
     */
    async updateStatus(id: string, status: string) {
        return this.leadModel.findByIdAndUpdate(id, { status }, { new: true });
    }

    /**
     * Verificar se lead já existe (por email)
     */
    async findByEmail(email: string) {
        return this.leadModel.findOne({ email });
    }
}
