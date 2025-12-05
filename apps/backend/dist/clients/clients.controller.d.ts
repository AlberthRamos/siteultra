import { ClientsService } from './clients.service';
export declare class ClientsController {
    private clientsService;
    constructor(clientsService: ClientsService);
    create(body: any): Promise<any>;
    findAll(status?: string, assignedTo?: string): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    updateStatus(id: string, status: string): Promise<any>;
    addNote(id: string, note: string, req: any): Promise<any>;
    assignTo(id: string, adminId: string): Promise<any>;
}
