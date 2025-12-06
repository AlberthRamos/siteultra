import { MongooseModule } from '@nestjs/mongoose';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminUser, AdminUserSchema } from './schemas/admin-user.schema';
import * as bcrypt from 'bcryptjs';
import { INestApplicationContext } from '@nestjs/common';

async function bootstrap() {
  const applicationContext = await NestFactory.createApplicationContext(AppModule);

  const userModel = applicationContext.get('AdminUserModel');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);

  const user = new userModel({
    email: 'admin@ultrasystemsgroup.com.br',
    password: hashedPassword,
    name: 'Admin',
    is_active: true,
  });

  await user.save();
  console.log('Admin user created successfully');
  await applicationContext.close();
}

bootstrap();
