"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const admin_user_schema_1 = require("../schemas/admin-user.schema");
const client_schema_1 = require("../schemas/client.schema");
let AuthService = class AuthService {
    adminModel;
    clientModel;
    jwtService;
    constructor(adminModel, clientModel, jwtService) {
        this.adminModel = adminModel;
        this.clientModel = clientModel;
        this.jwtService = jwtService;
    }
    async loginAdmin(email, password) {
        if (!email.endsWith('@ultrasystemsgroup.com.br')) {
            throw new common_1.UnauthorizedException('Email deve ser @ultrasystemsgroup.com.br');
        }
        const admin = await this.adminModel.findOne({ email, is_active: true });
        if (!admin) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Senha incorreta');
        }
        admin.last_login = new Date();
        await admin.save();
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
    async loginClient(email, password) {
        const client = await this.clientModel.findOne({ email, is_active: true });
        if (!client) {
            throw new common_1.UnauthorizedException('Cliente não encontrado');
        }
        const isValid = await bcrypt.compare(password, client.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Senha incorreta');
        }
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
    async createAdmin(email, name, password) {
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
    async validateUser(payload) {
        if (payload.role === 'admin') {
            return this.adminModel.findById(payload.sub);
        }
        else {
            return this.clientModel.findById(payload.sub);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_user_schema_1.AdminUser.name)),
    __param(1, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map