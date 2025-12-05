import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // 1. Proteger UltraCRM (Acesso Restrito)
    if (pathname.startsWith('/crm')) {
        if (!token || token.role !== 'master_admin') {
            // Bloqueia leads ou usuários não logados de verem qualquer url do CRM
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // 2. Proteger Portal do Cliente
    if (pathname.startsWith('/portal')) {
        if (!token) return NextResponse.redirect(new URL('/login', req.url));

        // Feature Flag: Ultra Security
        if (pathname.includes('/security') && !token.hasSecurityContract) {
            // Lógica visual para mostrar "Coming Soon" é tratada na página, 
            // mas aqui podemos redirecionar se for crítico.
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/crm/:path*', '/portal/:path*'],
};