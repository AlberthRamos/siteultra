import { Controller, Get, Post, Body, Param, Patch, UseGuards, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard, AdminGuard } from '../auth/guards';

/**
 * LeadsController - Endpoints de Leads
 */
@Controller('leads')
export class LeadsController {
    constructor(private leadsService: LeadsService) { }

    /**
     * POST /api/leads
     * Criar lead (público - formulário do site)
     */
    @Post()
    async create(@Body() body: any) {
        return this.leadsService.create(body);
    }

    /**
     * GET /api/leads
     * Listar leads (Admin apenas)
     */
    @Get()
    @UseGuards(JwtAuthGuard, AdminGuard)
    async findAll(@Query('status') status?: string, @Query('service') service?: string) {
        return this.leadsService.findAll({ status, service });
    }

    /**
     * GET /api/leads/:id
     * Buscar lead por ID (Admin)
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async findOne(@Param('id') id: string) {
        return this.leadsService.findOne(id);
    }

    /**
     * PATCH /api/leads/:id/status
     * Atualizar status (Admin)
     */
    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.leadsService.updateStatus(id, status);
    }
}
