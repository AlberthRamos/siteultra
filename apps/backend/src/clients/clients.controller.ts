import { Controller, Get, Post, Body, Param, Patch, UseGuards, Query, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard, AdminGuard, ClientGuard } from '../auth/guards';

/**
 * ClientsController - Endpoints de Clientes
 */
@Controller('clients')
export class ClientsController {
    constructor(private clientsService: ClientsService) { }

    /**
     * POST /api/clients
     * Criar cliente (Admin)
     */
    @Post()
    @UseGuards(JwtAuthGuard, AdminGuard)
    async create(@Body() body: any) {
        return this.clientsService.create(body);
    }

    /**
     * GET /api/clients
     * Listar clientes (Admin)
     */
    @Get()
    @UseGuards(JwtAuthGuard, AdminGuard)
    async findAll(@Query('status') status?: string, @Query('assigned_to') assignedTo?: string) {
        return this.clientsService.findAll({ status, assigned_to: assignedTo });
    }

    /**
     * GET /api/clients/:id
     * Buscar cliente (Admin ou próprio Client)
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string, @Request() req: any) {
        // Client só pode ver seus próprios dados
        if (req.user.role === 'client' && req.user.userId !== id) {
            throw new Error('Acesso negado');
        }
        return this.clientsService.findOne(id);
    }

    /**
     * PATCH /api/clients/:id/status
     * Atualizar status (Admin)
     */
    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.clientsService.updateStatus(id, status);
    }

    /**
     * POST /api/clients/:id/notes
     * Adicionar nota (Admin)
     */
    @Post(':id/notes')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async addNote(@Param('id') id: string, @Body('note') note: string, @Request() req: any) {
        return this.clientsService.addNote(id, note, req.user.userId);
    }

    /**
     * PATCH /api/clients/:id/assign
     * Atribuir vendedor (Admin)
     */
    @Patch(':id/assign')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async assignTo(@Param('id') id: string, @Body('admin_id') adminId: string) {
        return this.clientsService.assignTo(id, adminId);
    }
}
