import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client, ClientSchema } from '../schemas/client.schema';
import { LeadsModule } from '../leads/leads.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
        LeadsModule, // Para verificar leads existentes
    ],
    providers: [ClientsService],
    controllers: [ClientsController],
    exports: [ClientsService],
})
export class ClientsModule { }
