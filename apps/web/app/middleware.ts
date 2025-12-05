import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

    // 1. Proteger CRM (apenas master_admin)
    if (pathname.startsWith('/crm')) {
        if (!token || token.role !== 'master_admin') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
        }
    }

    // 2. Proteger Portal do Cliente
    if (pathname.startsWith('/portal')) {
        if (!token) {
            // Verificar token temporário (para leads)
            const tempToken = req.nextUrl.searchParams.get('token')
            if (!tempToken) {
                return NextResponse.redirect(new URL('/login', req.url))
            }
            // TODO: Validar token temporário
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/crm/:path*', '/portal/:path*'],
}
