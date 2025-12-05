# Ultra Systems Web - Next.js 14

## ✅ Fase 1: Setup Next.js 14 - CONCLUÍDO

### Stack Implementada

- ✅ Next.js 14 (App Router)
- ✅ TypeScript
- ✅ MUI v5 com tema Glassmorphism
- ✅ NextAuth.js (autenticação + RBAC)
- ✅ TanStack Query (data fetching)
- ✅ Framer Motion (animações)
- ✅ Recharts (gráficos)
- ✅ Zustand (state management)

### Estrutura Criada

```
apps/web/
├── app/
│   ├── (public)/          # Site institucional (próxima fase)
│   ├── (auth)/            # Login (próxima fase)
│   ├── portal/            # Portal do cliente (próxima fase)
│   ├── crm/               # CRM admin (próxima fase)
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts  ✅
│   ├── layout.tsx         ✅
│   ├── providers.tsx      ✅
│   ├── middleware.ts      ✅
│   ├── globals.css        ✅
│   └── page.tsx           ✅
├── lib/
│   ├── theme.ts           ✅ (Glassmorphism)
│   └── auth.ts            ✅ (NextAuth config)
├── types/
│   └── next-auth.d.ts     ✅
├── package.json           ✅
├── tsconfig.json          ✅
├── next.config.js         ✅
└── .env.local             ✅
```

### Como Rodar

```bash
cd apps/web
npm run dev
```

Acesse: <http://localhost:3000>

### Próximos Passos

- [ ] Fase 2: Site Institucional
- [ ] Fase 3: Portal do Cliente (com parser Verot)
- [ ] Fase 4: CRM
- [ ] Fase 5: Backend NestJS
- [ ] Fase 6: Deploy

### Configuração

Variáveis de ambiente em `.env.local`:

- NEXT_PUBLIC_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- NEXT_PUBLIC_API_URL
- DATABASE_URL
- TEMP_TOKEN_SECRET
- REVALIDATE_SECRET
