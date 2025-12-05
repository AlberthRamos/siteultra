import {
    Controller,
    Post,
    Get,
    Param,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuditService } from './audit.service';
import { JwtAuthGuard, AdminGuard } from '../auth/guards';

/**
 * AuditController - Endpoints de Auditoria
 */
@Controller('audit')
export class AuditController {
    constructor(private auditService: AuditService) { }

    /**
     * POST /api/audit/upload/:clientId
     * Upload de Excel (Admin)
     */
    @Post('upload/:clientId')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadExcel(
        @Param('clientId') clientId: string,
        @UploadedFile() file: Express.Multer.File,
        @Request() req: any,
    ) {
        return this.auditService.processExcel(file, clientId, req.user.userId);
    }

    /**
     * GET /api/audit/client/:clientId
     * Buscar dados de auditoria por cliente
     */
    @Get('client/:clientId')
    @UseGuards(JwtAuthGuard)
    async getByClient(@Param('clientId') clientId: string, @Request() req: any) {
        // Client só pode ver seus próprios dados
        if (req.user.role === 'client' && req.user.userId !== clientId) {
            throw new Error('Acesso negado');
        }
        return this.auditService.findByClient(clientId);
    }

    /**
     * GET /api/audit/:id
     * Buscar dados de auditoria por ID (Admin)
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async findOne(@Param('id') id: string) {
        return this.auditService.findOne(id);
    }
}
