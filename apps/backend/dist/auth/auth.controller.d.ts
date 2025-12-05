import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginAdmin(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            role: string;
        };
    }>;
    loginClient(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            company: string;
            role: string;
        };
    }>;
    createAdmin(body: {
        email: string;
        name: string;
        password: string;
    }): Promise<{
        id: import("mongoose").Types.ObjectId;
        email: string;
        name: string;
    }>;
}
