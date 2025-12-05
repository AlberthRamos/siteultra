import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        email: string
        name: string
        role: 'master_admin' | 'auditor' | 'client' | 'lead'
    }

    interface Session {
        user: User
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role: string
    }
}
