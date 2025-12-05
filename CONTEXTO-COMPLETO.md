# 📋 CONTEXTO COMPLETO - Ultra Systems Platform

**Data de Atualização:** 05/12/2024 05:33  
**Status do Projeto:** 🟡 Em Desenvolvimento Ativo  
**Última Sessão:** Melhorias de UI/UX e Interatividade

---

## 🎯 VISÃO GERAL DO PROJETO

**Ultra Systems** é uma plataforma full-stack de **Inteligência Tributária** e **Cibersegurança Ofensiva** que combina:

- 🏢 **Site Institucional** (público)
- 🔐 **Portal do Cliente** (autenticado)
- 👨‍💼 **CRM Administrativo** (rota ofuscada)
- 🤖 **IA para Geração de Conteúdo** (blog automático)
- 📊 **Engine de Relatórios Fiscais** (processamento de Excel Verot)

---

## 🏗️ ARQUITETURA ATUAL

### **Estrutura de Pastas (Monorepo)**

```
ultra-systems/
├── apps/
│   ├── web/                    # Frontend Next.js 14 (porta 3000)
│   ├── backend/                # Backend NestJS (porta 3001)
│   └── frontend/               # Legacy (não usar)
│
├── api/                        # Legacy API Express (não usar)
├── Context/                    # Documentação e specs (.feat files)
├── UltraTax.rag/              # Base de conhecimento (PDFs)
└── infra/                      # Docker configs
```

### **Stack Tecnológica**

#### **Frontend (apps/web)**

- **Framework:** Next.js 14 (App Router)
- **UI Library:** Material-UI v5 + Emotion
- **Animações:** Framer Motion
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Auth:** NextAuth.js
- **Charts:** Recharts
- **Ícones:** Lucide React + MUI Icons

#### **Backend (apps/backend)**

- **Framework:** NestJS
- **Database:** PostgreSQL (via Prisma ORM)
- **Cache:** Redis (planejado)
- **Auth:** JWT + Passport
- **Validação:** Class Validator
- **File Processing:** Multer, XLSX, PDFKit

#### **DevOps**

- **Containerização:** Docker + Docker Compose
- **CI/CD:** GitHub Actions (planejado)
- **Deploy:** Render.com (configurado)

---

## 📂 ESTRUTURA DO FRONTEND (apps/web)

### **Rotas Principais**

```
app/
├── (public)/                   # Site Institucional
│   ├── page.tsx               # Home
│   ├── ultra-tax/             # Página do serviço UltraTax
│   ├── ultra-security/        # Página do serviço UltraSecurity
│   ├── sobre/                 # Sobre a empresa
│   └── contato/               # Contato
│
├── (auth)/                     # Autenticação
│   └── login/                 # Login
│
├── portal/                     # Portal do Cliente (protegido)
│   ├── dashboard/             # "Primeira Análise"
│   ├── audit-tracker/         # Timeline 8 etapas
│   ├── security/              # Placeholders
│   └── perfil/                # Perfil do usuário
│
└── sys_8x9_core/              # CRM Admin (rota ofuscada)
    ├── users/                 # Gerenciamento de usuários
    ├── cms/                   # Gerenciamento de conteúdo
    └── ai-control/            # Controle da IA
```

### **Componentes Principais**

```
components/
├── layout/
│   ├── Header.tsx             # Cabeçalho com navegação
│   ├── Footer.tsx             # Rodapé
│   └── Sidebar.tsx            # Sidebar do portal
│
├── ui/
│   ├── GlassCard.tsx          # Card com efeito glassmorphism
│   ├── NeonButton.tsx         # Botão com efeito neon
│   └── LoadingSpinner.tsx     # Spinner de loading
│
└── features/
    ├── FirstAnalysisDashboard.tsx    # Dashboard "Primeira Análise"
    └── AuditTrackerTimeline.tsx      # Timeline de auditoria
```

---

## 🔧 BACKEND (apps/backend)

### **Estrutura de Módulos**

```
src/
├── auth/                       # Autenticação e autorização
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/            # JWT, Local
│   └── guards/                # RBAC guards
│
├── users/                      # Gerenciamento de usuários
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── entities/
│       └── user.entity.ts
│
├── tax/                        # Engine de relatórios fiscais
│   ├── tax.controller.ts
│   ├── tax.service.ts
│   ├── parsers/
│   │   └── verot-parser.service.ts
│   └── calculators/
│       └── recovery-calculator.service.ts
│
├── cms/                        # Gerenciamento de conteúdo
│   ├── cms.controller.ts
│   └── cms.service.ts
│
└── ai/                         # IA e automação
    ├── ai.controller.ts
    ├── ai.service.ts
    └── cron/
        └── auto-blog.cron.ts
```

### **Principais Endpoints**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Login de usuário |
| POST | `/auth/register` | Registro de usuário |
| GET | `/users` | Listar usuários (admin) |
| POST | `/tax/analyze` | Analisar dados Verot |
| GET | `/tax/reports/:id` | Buscar relatório |
| POST | `/cms/banners` | Criar banner |
| GET | `/cms/blog` | Listar posts do blog |

---

## 🎨 DESIGN SYSTEM

### **Tema Glassmorphism**

```typescript
// Cores principais
const colors = {
  primary: '#00f2ff',      // Neon Blue
  secondary: '#7c3aed',    // Purple
  dark: '#0a0a0f',         // Background
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
}

// Efeito Glass
const glassEffect = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}
```

### **Tipografia**

- **Headings:** Inter (Google Fonts)
- **Body:** Inter
- **Code:** Fira Code

### **Animações (Framer Motion)**

- **Page Transitions:** Fade + Slide
- **Hover Effects:** Scale + Glow
- **Micro-interactions:** Bounce, Spring

---

## 📊 FUNCIONALIDADES IMPLEMENTADAS

### ✅ **Fase 1: Site Institucional**

- [x] Home page com hero section
- [x] Páginas de serviços (UltraTax, UltraSecurity)
- [x] FAQ interativo
- [x] Calculadora de economia tributária
- [x] Formulário de captura de leads
- [x] PWA (Progressive Web App)
- [x] Analytics (GA4 + Meta Pixel)

### ✅ **Fase 2: Portal do Cliente**

- [x] Autenticação com NextAuth
- [x] Dashboard "Primeira Análise"
- [x] Audit Tracker (timeline 8 etapas)
- [x] Placeholders para Security
- [x] Perfil do usuário

### 🔄 **Fase 3: Em Desenvolvimento**

- [ ] CRM completo (sys_8x9_core)
- [ ] Upload de Excel Verot
- [ ] Geração automática de relatórios PDF
- [ ] Blog com IA (auto-posting)
- [ ] SEO AI Manager

---

## 🤖 REPORT ENGINE (Especificação Técnica)

### **Fluxo de Processamento**

```
1. Cliente faz upload de Excel Verot
   ↓
2. Backend parseia dados (verot-parser.service.ts)
   ↓
3. Algoritmos calculam créditos recuperáveis
   ↓
4. IA gera insights e recomendações
   ↓
5. PDF profissional é gerado
   ↓
6. Email automático é enviado ao cliente
   ↓
7. Cliente visualiza no portal
```

### **Formato de Entrada (Excel Verot)**

```typescript
interface VerotInputData {
  empresa: {
    cnpj: string;
    razaoSocial: string;
    periodo: { inicio: string; fim: string };
  };
  tributos: {
    pis: TributoDetalhes;
    cofins: TributoDetalhes;
    icms: TributoDetalhes;
    irpj: TributoDetalhes;
    csll: TributoDetalhes;
  };
  creditos: {
    identificados: CreditoItem[];
    potenciais: CreditoItem[];
  };
}
```

### **Formato de Saída (Dashboard JSON)**

```typescript
interface FirstAnalysisReport {
  metadata: {
    cnpj: string;
    razaoSocial: string;
    periodoAnalise: string;
    dataGeracao: string;
  };
  kpis: {
    valorRecuperavel: number;
    percentualEconomia: number;
    totalTributosPagos: number;
    quantidadeCreditosIdentificados: number;
  };
  charts: {
    distribuicaoTributaria: ChartData[];
    economiaEstimada: BarChartData[];
    timelineRecuperacao: TimelineData[];
  };
  creditos: {
    identificados: CreditoItem[];
    potenciais: CreditoItem[];
  };
  recomendacoes: string[];
}
```

---

## 🔐 AUTENTICAÇÃO E RBAC

### **Roles (Papéis)**

| Role | Descrição | Acesso |
|------|-----------|--------|
| `master_admin` | Administrador total | Tudo |
| `auditor` | Auditor fiscal | CRM + Relatórios |
| `client` | Cliente final | Portal do Cliente |
| `lead` | Lead não convertido | Nenhum (apenas login) |

### **Proteção de Rotas (Middleware)**

```typescript
// apps/web/middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token');
  const { pathname } = request.nextUrl;

  // Proteger rotas /portal
  if (pathname.startsWith('/portal') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Proteger rotas /sys_8x9_core (apenas master_admin)
  if (pathname.startsWith('/sys_8x9_core')) {
    // Verificar role no token JWT
    // ...
  }
}
```

---

## 📝 ARQUIVOS DE CONTEXTO (.feat)

Localizados em `Context/`, esses arquivos contêm especificações técnicas:

1. **report-engine.feat** - Engine de relatórios fiscais
2. **verot-excel-parser.feat** - Parser de Excel Verot
3. **cms-architecture.feat** - Arquitetura do CMS
4. **security.feat** - Especificações de segurança
5. **ai-seo.feat** - IA para SEO e blog automático

---

## 🚀 COMO RODAR O PROJETO

### **Opção 1: Docker (Recomendado)**

```bash
# Windows
setup-docker.bat

# Linux/Mac
chmod +x setup-docker.sh
./setup-docker.sh
```

**Acessos:**

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:3001>
- Mongo Express: <http://localhost:8081> (admin/ultra2024)

### **Opção 2: Desenvolvimento Local**

```bash
# 1. Frontend (Next.js)
cd apps/web
npm install
npm run dev

# 2. Backend (NestJS)
cd apps/backend
npm install
npm run start:dev

# 3. MongoDB (Docker)
docker run -d -p 27017:27017 --name ultra-mongo mongo:7.0
```

---

## 📈 ROADMAP E PRÓXIMOS PASSOS

### **Curto Prazo (1-2 semanas)**

- [ ] Finalizar upload de Excel Verot
- [ ] Implementar parser completo
- [ ] Gerar PDFs de relatórios
- [ ] Envio automático de emails
- [ ] Dashboard de "Primeira Análise" com dados reais

### **Médio Prazo (1 mês)**

- [ ] Blog com IA (5+ posts/dia)
- [ ] SEO AI Manager
- [ ] CRM completo (pipeline de vendas)
- [ ] Integração com Verot.com.br (API)
- [ ] Webhooks para automações

### **Longo Prazo (3 meses)**

- [ ] Mobile app (React Native)
- [ ] IA para qualificação de leads
- [ ] Dashboard analytics avançado
- [ ] Multi-tenancy (white-label)

---

## 🛠️ COMANDOS ÚTEIS

### **Frontend (apps/web)**

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run start        # Rodar build
npm run lint         # Lint
```

### **Backend (apps/backend)**

```bash
npm run start:dev    # Desenvolvimento (watch mode)
npm run build        # Build
npm run start:prod   # Produção
npm run test         # Testes
```

### **Docker**

```bash
docker-compose up -d              # Iniciar tudo
docker-compose down               # Parar tudo
docker-compose logs -f            # Ver logs
docker-compose restart backend    # Reiniciar backend
docker-compose down -v            # Parar e limpar volumes
```

---

## 📊 MÉTRICAS E KPIs

### **Performance**

- **Lighthouse Score:** 95+ (meta)
- **Time to Interactive:** < 3s
- **First Contentful Paint:** < 1.5s

### **Negócio**

- **Taxa de Conversão de Leads:** 15% (meta)
- **Tempo de Geração de Relatório:** < 30s
- **Tráfego Orgânico:** +20% mês a mês

---

## 🔒 SEGURANÇA

### **Implementado**

- ✅ Helmet.js (headers de segurança)
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ Input validation (Joi)
- ✅ JWT com refresh tokens
- ✅ HTTPS (produção)
- ✅ Environment variables (.env)

### **Planejado**

- [ ] 2FA (Two-Factor Authentication)
- [ ] Audit logs completos
- [ ] LGPD compliance
- [ ] Criptografia de dados sensíveis
- [ ] Penetration testing

---

## 📞 INFORMAÇÕES DE CONTATO

- **Website:** <https://ultrasystems.com.br>
- **WhatsApp:** (41) 9 9288-1153
- **Email:** <contato@ultrasystems.com.br>

---

## 🎓 RECURSOS E DOCUMENTAÇÃO

### **Documentação Oficial**

- [Next.js 14 Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Material-UI Docs](https://mui.com)
- [Framer Motion Docs](https://www.framer.com/motion)

### **Arquivos de Referência**

- `Context/report-engine.feat` - Especificação do engine
- `Context/ArquiteturaPastas.md` - Arquitetura completa
- `README.md` - Guia de instalação
- `IMPLEMENTATION-PLAN.md` - Plano de implementação

---

## 🏆 STATUS ATUAL

**🟢 FUNCIONANDO:**

- ✅ Site institucional
- ✅ Autenticação
- ✅ Portal do cliente (básico)
- ✅ Captura de leads
- ✅ PWA

**🟡 EM DESENVOLVIMENTO:**

- ⏳ Upload de Excel Verot
- ⏳ Geração de relatórios PDF
- ⏳ CRM completo
- ⏳ Blog com IA

**🔴 PLANEJADO:**

- ⏸️ SEO AI Manager
- ⏸️ Mobile app
- ⏸️ Multi-tenancy

---

## 💡 DICAS PARA CONTINUAR

### **1. Antes de Codar**

- Leia `Context/report-engine.feat` para entender o fluxo
- Verifique `Context/ArquiteturaPastas.md` para estrutura
- Revise os arquivos `.feat` relevantes

### **2. Ao Desenvolver**

- Use **caminhos absolutos** sempre
- Leia o arquivo antes de editar
- Teste localmente antes de commitar
- Documente mudanças importantes

### **3. Debugging**

- Frontend: `npm run dev` (porta 3000)
- Backend: `npm run start:dev` (porta 3001)
- Logs: `docker-compose logs -f`
- Database: <http://localhost:8081> (Mongo Express)

### **4. Deploy**

- Frontend: Vercel (recomendado)
- Backend: Render.com (configurado)
- Database: MongoDB Atlas (produção)

---

## 📌 NOTAS IMPORTANTES

1. **Rota Ofuscada:** `/sys_8x9_core` é o CRM admin (não mudar)
2. **Verot Integration:** Parceiro oficial para dados fiscais
3. **IA:** Usar Gemini 2.5 Flash para geração de conteúdo
4. **Design:** Manter Glassmorphism + Dark Mode + Neon
5. **Performance:** Lazy loading + ISR + Edge Functions

---

**Desenvolvido com ❤️ pela equipe Ultra Systems**  
**Última atualização:** 05/12/2024 05:33
