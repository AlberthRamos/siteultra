import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from './schemas/admin-user.schema';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const adminModel = app.get<Model<AdminUser>>(getModelToken(AdminUser.name));

    // Verificar se já existe admin
    const count = await adminModel.countDocuments();
    if (count > 0) {
        console.log('⚠️  Admin já existe');
        await app.close();
        return;
    }

    // Criar primeiro admin
    const hashedPassword = await bcrypt.hash('Ultra@2024', 10);

    await adminModel.create({
        email: 'infra@ultrasystemsgroup.com.br',
        name: 'Infraestrutura Ultra Systems',
        password: hashedPassword,
        is_active: true,
    });

    console.log('✅ Admin criado!');
    console.log('Email: infra@ultrasystemsgroup.com.br');
    console.log('Senha: Ultra@2024');

    await app.close();
}

seed();
