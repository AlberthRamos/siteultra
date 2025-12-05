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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const admin_user_schema_1 = require("./schemas/admin-user.schema");
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const adminModel = app.get((0, mongoose_1.getModelToken)(admin_user_schema_1.AdminUser.name));
    const count = await adminModel.countDocuments();
    if (count > 0) {
        console.log('⚠️  Admin já existe');
        await app.close();
        return;
    }
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
//# sourceMappingURL=seed.js.map