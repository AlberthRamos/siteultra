import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AdminUser, AdminUserSchema } from '../schemas/admin-user.schema';
import { Client, ClientSchema } from '../schemas/client.schema';

@Module({
    imports: [
        PassportModule,
        MongooseModule.forFeature([
            { name: AdminUser.name, schema: AdminUserSchema },
            { name: Client.name, schema: ClientSchema },
        ]),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
