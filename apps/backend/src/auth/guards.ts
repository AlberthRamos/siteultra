import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard - Guard para proteger rotas com JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

/**
 * AdminGuard - Guard para permitir apenas Admin
 */
@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user && user.role === 'admin';
    }
}

/**
 * ClientGuard - Guard para permitir apenas Client
 */
@Injectable()
export class ClientGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user && user.role === 'client';
    }
}
