import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { AuditData, AuditDataSchema } from '../schemas/audit-data.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AuditData.name, schema: AuditDataSchema }]),
        MulterModule.register({
            limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
        }),
    ],
    providers: [AuditService],
    controllers: [AuditController],
    exports: [AuditService],
})
export class AuditModule { }
