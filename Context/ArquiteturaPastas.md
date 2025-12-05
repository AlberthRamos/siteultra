# Ultra Systems Platform - Arquitetura de Pastas (Monorepo)

## Estrutura Completa

```
ultra-systems-platform/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI/CD pipeline
│       └── deploy.yml                # Deploy para Render.com
│
├── apps/
│   ├── web/                          # Frontend Next.js 14
│   │   ├── app/
│   │   │   ├── (public)/            # Site Institucional (público)
│   │   │   │   ├── page.tsx         # Home
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── servicos/
│   │   │   │   │   ├── ultratax/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── ultrasecurity/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── blog/
│   │   │   │   │   ├── page.tsx     # Lista de posts
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx # Post individual
│   │   │   │   ├── sobre/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── contato/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── (auth)/              # Autenticação
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── portal/              # Portal do Cliente (protegido)
│   │   │   │   ├── layout.tsx       # Layout com sidebar
│   │   │   │   ├── dashboard/       # "Primeira Análise"
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── audit-tracker/   # Timeline 8 etapas
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [stepId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── security/        # Placeholders
│   │   │   │   │   └── page.tsx
│   │   │   │   └── perfil/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── sys_8x9_core/        # CRM (rota ofuscada)
│   │   │   │   ├── layout.tsx       # Layout admin
│   │   │   │   ├── page.tsx         # Dashboard admin
│   │   │   │   ├── users/           # Gerenciamento de usuários
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── cms/             # Gerenciamento de conteúdo
│   │   │   │   │   ├── banners/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── blog/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── ai-control/      # Controle da IA
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── api/                 # API Routes
│   │   │   │   ├── auth/
│   │   │   │   │   └── [...nextauth]/
│   │   │   │   │       └── route.ts # NextAuth config
│   │   │   │   └── revalidate/
│   │   │   │       └── route.ts     # ISR revalidation
│   │   │   │
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── middleware.ts        # RBAC & Route Protection
│   │   │   └── globals.css
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                  # MUI customizado
│   │   │   │   ├── GlassCard.tsx
│   │   │   │   ├── NeonButton.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   └── StepperTimeline.tsx
│   │   │   ├── charts/              # Recharts wrappers
│   │   │   │   ├── PieChart.tsx
│   │   │   │   ├── BarChart.tsx
│   │   │   │   └── KPICard.tsx
│   │   │   ├── layouts/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── AdminSidebar.tsx
│   │   │   └── features/
│   │   │       ├── FirstAnalysisDashboard.tsx
│   │   │       ├── AuditTrackerTimeline.tsx
│   │   │       └── SecurityPlaceholders.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── auth.ts              # NextAuth config
│   │   │   ├── theme.ts             # MUI theme (Glassmorphism)
│   │   │   ├── api-client.ts        # TanStack Query setup
│   │   │   ├── security.ts          # Security utilities
│   │   │   └── utils.ts
│   │   │
│   │   ├── store/                   # Zustand stores
│   │   │   ├── useAuthStore.ts
│   │   │   └── useUIStore.ts
│   │   │
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   ├── .env.local
│   │   ├── .env.production
│   │   ├── next.config.js
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   │
│   ├── svc-auth/                    # Microservice de Autenticação
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   └── local.strategy.ts
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   │   └── roles.guard.ts
│   │   │   │   └── dto/
│   │   │   │       ├── login.dto.ts
│   │   │   │       ├── register.dto.ts
│   │   │   │       └── generate-temp-link.dto.ts
│   │   │   ├── users/
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.module.ts
│   │   │   │   └── entities/
│   │   │   │       └── user.entity.ts
│   │   │   ├── prisma/
│   │   │   │   ├── schema.prisma
│   │   │   │   └── prisma.service.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── .env
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   │
│   ├── svc-core/                    # Microservice de CMS
│   │   ├── src/
│   │   │   ├── cms/
│   │   │   │   ├── cms.controller.ts
│   │   │   │   ├── cms.service.ts
│   │   │   │   ├── cms.module.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-banner.dto.ts
│   │   │   │       └── update-banner.dto.ts
│   │   │   ├── blog/
│   │   │   │   ├── blog.controller.ts
│   │   │   │   ├── blog.service.ts
│   │   │   │   └── blog.module.ts
│   │   │   ├── cache/
│   │   │   │   └── redis.service.ts
│   │   │   ├── prisma/
│   │   │   │   ├── schema.prisma
│   │   │   │   └── prisma.service.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── .env
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── svc-tax-engine/              # Microservice de Relatórios Fiscais
│   │   ├── src/
│   │   │   ├── tax/
│   │   │   │   ├── tax.controller.ts
│   │   │   │   ├── tax.service.ts
│   │   │   │   ├── tax.module.ts
│   │   │   │   ├── parsers/
│   │   │   │   │   └── verot-parser.service.ts
│   │   │   │   ├── calculators/
│   │   │   │   │   ├── recovery-calculator.service.ts
│   │   │   │   │   └── opportunity-identifier.service.ts
│   │   │   │   └── dto/
│   │   │   │       ├── analyze-tax.dto.ts
│   │   │   │       └── verot-input.dto.ts
│   │   │   ├── audit/
│   │   │   │   ├── audit.controller.ts
│   │   │   │   ├── audit.service.ts
│   │   │   │   ├── audit.module.ts
│   │   │   │   └── dto/
│   │   │   │       └── update-step.dto.ts
│   │   │   ├── storage/
│   │   │   │   └── document-storage.service.ts
│   │   │   ├── prisma/
│   │   │   │   ├── schema.prisma
│   │   │   │   └── prisma.service.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── .env
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── svc-ai-agent/                # Microservice de IA
│       ├── src/
│       │   ├── ai/
│       │   │   ├── ai.controller.ts
│       │   │   ├── ai.service.ts
│       │   │   ├── ai.module.ts
│       │   │   ├── gemini/
│       │   │   │   └── gemini-client.service.ts
│       │   │   ├── cron/
│       │   │   │   └── auto-blog.cron.ts
│       │   │   └── dto/
│       │   │       └── generate-post.dto.ts
│       │   ├── seo/
│       │   │   ├── seo.service.ts
│       │   │   └── sitemap-generator.service.ts
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── .env
│       ├── package.json
│       └── Dockerfile
│
├── packages/                        # Shared Libraries
│   ├── ui/                          # Componentes compartilhados
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── GlassCard.tsx
│   │   │   ├── NeonButton.tsx
│   │   │   └── theme.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                       # TypeScript types
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── user.types.ts
│   │   │   ├── tax.types.ts
│   │   │   └── cms.types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                      # Configurações compartilhadas
│       ├── eslint-config/
│       │   └── index.js
│       ├── prettier-config/
│       │   └── index.js
│       └── tsconfig/
│           ├── base.json
│           ├── nextjs.json
│           └── nestjs.json
│
├── infra/                           # Infraestrutura
│   ├── docker-compose.yml           # Orquestração local
│   ├── docker-compose.prod.yml      # Orquestração produção
│   └── render.yaml                  # Config Render.com
│
├── Context/                         # Documentação e specs
│   ├── ArquiteturaPastas.md         # Este arquivo
│   ├── report-engine.feat
│   ├── cms-architecture.feat
│   ├── security.feat
│   ├── ai-seo.feat
│   ├── glassTheme.ts
│   ├── middleware.ts
│   └── mapa.json
│
├── UltraTax.rag/                    # Base de conhecimento (PDFs)
│   └── [PDFs de referência]
│
├── .gitignore
├── package.json                     # Root package.json (Turborepo)
├── turbo.json                       # Turborepo config
├── README.md
└── LICENSE

```

## Descrição dos Componentes Principais

### Frontend (apps/web)

**Next.js 14 com App Router**

- **Rotas Públicas** (`(public)`): Site institucional com ISR
- **Rotas de Auth** (`(auth)`): Login/Registro
- **Portal do Cliente** (`portal`): Dashboard, Audit Tracker, Security
- **CRM** (`sys_8x9_core`): Painel administrativo ofuscado

### Backend Microservices

#### svc-auth

- Autenticação JWT
- RBAC (roles: master_admin, auditor, client, lead)
- Geração de tokens temporários
- Gerenciamento de usuários

#### svc-core

- CMS para banners e blog
- Cache Redis
- Integração com ISR do Next.js
- Gerenciamento de conteúdo

#### svc-tax-engine

- Parser de dados Verot
- Cálculos de recuperação tributária
- Audit Tracker (8 etapas)
- Upload/Download de documentos

#### svc-ai-agent

- Integração Gemini 2.5 Flash
- Auto-blogging (cron job)
- Geração de sitemap
- SEO automation

### Shared Packages

- **@ultra/ui**: Componentes MUI customizados
- **@ultra/types**: TypeScript types compartilhados
- **@ultra/config**: ESLint, Prettier, TSConfig

## Tecnologias por Camada

### Frontend

- Next.js 14 (App Router)
- MUI v5 (Glassmorphism)
- Framer Motion
- Recharts
- Zustand
- TanStack Query
- NextAuth.js

### Backend

- NestJS
- Prisma ORM
- PostgreSQL 15
- Redis 7
- RabbitMQ 3.12
- JWT

### DevOps

- Docker & Docker Compose
- Turborepo
- GitHub Actions
- Render.com

## Fluxo de Dados

```
User → Next.js (Edge Middleware) → API Routes → Microservices → PostgreSQL
                                                      ↓
                                                   Redis Cache
```

## Próximos Passos

1. Criar estrutura de pastas
2. Configurar Turborepo
3. Implementar cada microservice
4. Migrar componentes do frontend atual
5. Configurar Docker Compose
6. Deploy para Render.com
