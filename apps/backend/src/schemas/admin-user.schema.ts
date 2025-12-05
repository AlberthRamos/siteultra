import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminUserDocument = AdminUser & Document;

/**
 * Schema de AdminUser - Usuários administradores do CRM
 * Vendedores e gestores que acessam o sistema
 */
@Schema({ timestamps: true })
export class AdminUser {
    @Prop({
        required: true,
        unique: true,
        validate: {
            validator: function (v: string) {
                return v.endsWith('@ultrasystemsgroup.com.br');
            },
            message: 'Email deve ser @ultrasystemsgroup.com.br'
        }
    })
    email: string;

    @Prop({ required: true })
    password: string; // Hash bcrypt

    @Prop({ required: true })
    name: string;

    @Prop({ default: true })
    is_active: boolean;

    @Prop()
    last_login?: Date;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
