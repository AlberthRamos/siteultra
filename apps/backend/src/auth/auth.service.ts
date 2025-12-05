import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AdminUser, AdminUserDocument } from '../schemas/admin-user.schema';
import { Client, ClientDocument } from '../schemas/client.schema';

/**
 * AuthService - Gerencia autenticação de Admin e Client
 * Suporta dois tipos de usuários:
 * - AdminUser: Acesso ao CRM completo
 * - Client: Acesso apenas ao próprio dashboard
 */
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AdminUser.name) private adminModel: Model<AdminUserDocument>,
        @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
        private jwtService: JwtService,
    ) { }

    /**
     * Login de Admin
     */
    async loginAdmin(email: string, password: string) {
        // Validar domínio
        if (!email.endsWith('@ultrasystemsgroup.com.br')) {
            throw new UnauthorizedException('Email deve ser @ultrasystemsgroup.com.br');
        }

        const admin = await this.adminModel.findOne({ email, is_active: true });
        if (!admin) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            throw new UnauthorizedException('Senha incorreta');
        }

        // Atualizar last_login
        admin.last_login = new Date();
        await admin.save();

        // Gerar token
        const payload = {
            sub: admin._id,
            email: admin.email,
            role: 'admin',
            name: admin.name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: 'admin',
            },
        };
    }

    /**
     * Login de Client (Portal do Cliente)
     */
    async loginClient(email: string, password: string) {
        const client = await this.clientModel.findOne({ email, is_active: true });
        if (!client) {
            throw new UnauthorizedException('Cliente não encontrado');
        }

        const isValid = await bcrypt.compare(password, client.password);
        if (!isValid) {
            throw new UnauthorizedException('Senha incorreta');
        }

        // Gerar token
        const payload = {
            sub: client._id,
            email: client.email,
            role: 'client',
            name: client.name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: client._id,
                email: client.email,
                name: client.name,
                company: client.company,
                role: 'client',
            },
        };
    }

    /**
     * Criar novo Admin
     */
    async createAdmin(email: string, name: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new this.adminModel({
            email,
            name,
            password: hashedPassword,
            is_active: true,
        });

        await admin.save();
        return { id: admin._id, email: admin.email, name: admin.name };
    }

    /**
     * Validar token JWT
     */
    async validateUser(payload: any) {
        if (payload.role === 'admin') {
            return this.adminModel.findById(payload.sub);
        } else {
            return this.clientModel.findById(payload.sub);
        }
    }
}
