import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * AuthController - Endpoints de autenticação
 */
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * POST /api/auth/admin/login
     * Login de administrador
     */
    @Post('admin/login')
    @HttpCode(HttpStatus.OK)
    async loginAdmin(@Body() body: { email: string; password: string }) {
        return this.authService.loginAdmin(body.email, body.password);
    }

    /**
     * POST /api/auth/client/login
     * Login de cliente (Portal do Cliente)
     */
    @Post('client/login')
    @HttpCode(HttpStatus.OK)
    async loginClient(@Body() body: { email: string; password: string }) {
        return this.authService.loginClient(body.email, body.password);
    }

    /**
     * POST /api/auth/admin/create
     * Criar novo admin (protegido - só admin pode criar)
     */
    @Post('admin/create')
    async createAdmin(@Body() body: { email: string; name: string; password: string }) {
        return this.authService.createAdmin(body.email, body.name, body.password);
    }
}
