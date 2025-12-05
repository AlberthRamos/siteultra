# ⚡ GUIA RÁPIDO - Ultra Systems

**Comandos essenciais para retomar o desenvolvimento rapidamente**

---

## 🚀 INICIAR O PROJETO

### **Opção 1: Desenvolvimento Local (Recomendado)**

```bash
# Terminal 1: Frontend Next.js
cd apps/web
npm run dev
# Acesse: http://localhost:3000

# Terminal 2: Backend NestJS
cd apps/backend
npm run start:dev
# API: http://localhost:3001

# Terminal 3: MongoDB (se necessário)
docker run -d -p 27017:27017 --name ultra-mongo mongo:7.0
```

### **Opção 2: Docker Compose**

```bash
# Iniciar tudo de uma vez
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar tudo
docker-compose down
```

---

## 📂 NAVEGAÇÃO RÁPIDA

### **Arquivos Principais**

```bash
# Frontend
apps/web/app/(public)/page.tsx              # Home page
apps/web/app/(public)/ultra-tax/page.tsx    # Página UltraTax
apps/web/components/layout/Footer.tsx       # Footer
apps/web/lib/auth.ts                        # Autenticação

# Backend
apps/backend/src/auth/                      # Módulo de auth
apps/backend/src/tax/                       # Engine de relatórios
apps/backend/src/users/                     # Gerenciamento de usuários

# Documentação
CONTEXTO-COMPLETO.md                        # Contexto completo do projeto
ULTIMA-SESSAO.md                            # Última sessão de dev
Context/report-engine.feat                  # Spec do engine de relatórios
Context/ArquiteturaPastas.md                # Arquitetura completa
```

---

## 🔧 COMANDOS ÚTEIS

### **Frontend (apps/web)**

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Rodar build
npm run start

# Lint
npm run lint

# Limpar cache Next.js
rm -rf .next
```

### **Backend (apps/backend)**

```bash
# Desenvolvimento (watch mode)
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Testes
npm run test

# Testes E2E
npm run test:e2e

# Gerar migration Prisma
npx prisma migrate dev

# Abrir Prisma Studio
npx prisma studio
```

### **Docker**

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f

# Reiniciar serviço específico
docker-compose restart backend

# Limpar volumes
docker-compose down -v

# Rebuild
docker-compose up -d --build
```

---

## 🌐 ACESSOS RÁPIDOS

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| **Frontend** | <http://localhost:3000> | - |
| **Backend API** | <http://localhost:3001> | - |
| **Mongo Express** | <http://localhost:8081> | admin / ultra2024 |
| **Prisma Studio** | <http://localhost:5555> | - |

### **Rotas Importantes**

```
http://localhost:3000                    # Home
http://localhost:3000/ultra-tax          # Página UltraTax
http://localhost:3000/ultra-security     # Página UltraSecurity
http://localhost:3000/login              # Login
http://localhost:3000/portal/dashboard   # Portal do Cliente
http://localhost:3000/sys_8x9_core       # CRM Admin
```

---

## 🐛 DEBUGGING

### **Frontend**

```bash
# Ver erros no console do browser
# Abra DevTools (F12) → Console

# Verificar build
npm run build

# Analisar bundle
npm run build && npx @next/bundle-analyzer
```

### **Backend**

```bash
# Ver logs em tempo real
npm run start:dev

# Debug mode
npm run start:debug

# Verificar conexão com DB
npx prisma db pull
```

### **Docker**

```bash
# Ver logs de um serviço específico
docker-compose logs -f backend

# Entrar no container
docker exec -it ultra-backend sh

# Verificar status
docker-compose ps

# Limpar tudo e recomeçar
docker-compose down -v
docker-compose up -d --build
```

---

## 📦 INSTALAR DEPENDÊNCIAS

### **Frontend**

```bash
cd apps/web

# Instalar tudo
npm install

# Adicionar nova dependência
npm install <package-name>

# Adicionar dev dependency
npm install -D <package-name>
```

### **Backend**

```bash
cd apps/backend

# Instalar tudo
npm install

# Adicionar nova dependência
npm install <package-name>

# Adicionar dev dependency
npm install -D <package-name>
```

---

## 🔍 BUSCAR NO CÓDIGO

### **Grep (busca rápida)**

```bash
# Buscar texto em todos os arquivos
grep -r "texto" apps/

# Buscar em arquivos TypeScript
grep -r "texto" apps/ --include="*.ts" --include="*.tsx"

# Buscar ignorando case
grep -ri "texto" apps/
```

### **Find (buscar arquivos)**

```bash
# Buscar arquivo por nome
find apps/ -name "Footer.tsx"

# Buscar todos os .tsx
find apps/ -name "*.tsx"

# Buscar e executar comando
find apps/ -name "*.tsx" -exec grep "Framer Motion" {} \;
```

---

## 🔐 VARIÁVEIS DE AMBIENTE

### **Frontend (.env.local)**

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
```

### **Backend (.env)**

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ultra_systems

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📝 GIT WORKFLOW

```bash
# Ver status
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "feat: descrição da mudança"

# Push
git push origin main

# Pull (atualizar)
git pull origin main

# Criar branch
git checkout -b feature/nova-feature

# Ver branches
git branch

# Mudar de branch
git checkout main
```

---

## 🧪 TESTES

### **Frontend**

```bash
# Rodar testes (se configurado)
npm run test

# Testes E2E com Playwright (se configurado)
npx playwright test
```

### **Backend**

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 🚀 DEPLOY

### **Frontend (Vercel)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel

# Deploy produção
vercel --prod
```

### **Backend (Render.com)**

```bash
# Já configurado via render.yaml
# Push para GitHub e Render faz deploy automático
git push origin main
```

---

## 📊 MONITORAMENTO

### **Logs**

```bash
# Frontend (Next.js)
# Ver no terminal onde rodou `npm run dev`

# Backend (NestJS)
# Ver no terminal onde rodou `npm run start:dev`

# Docker
docker-compose logs -f
```

### **Database**

```bash
# Prisma Studio (GUI)
cd apps/backend
npx prisma studio

# Mongo Express (se usando MongoDB)
# http://localhost:8081
```

---

## 🎨 DESIGN TOKENS

### **Cores**

```typescript
const colors = {
  primary: '#00f2ff',      // Neon Blue
  secondary: '#7c3aed',    // Purple
  dark: '#0a0a0f',         // Background
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
}
```

### **Breakpoints**

```typescript
const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
}
```

---

## 🔥 ATALHOS DO EDITOR

### **VS Code**

```
Ctrl + P          # Buscar arquivo
Ctrl + Shift + F  # Buscar em todos os arquivos
Ctrl + `          # Abrir terminal
Ctrl + B          # Toggle sidebar
F5                # Debug
Ctrl + Shift + P  # Command palette
```

---

## 📚 RECURSOS RÁPIDOS

### **Documentação**

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Framer Motion](https://www.framer.com/motion)

### **Contexto do Projeto**

1. Leia `CONTEXTO-COMPLETO.md` primeiro
2. Depois `ULTIMA-SESSAO.md`
3. Consulte `Context/report-engine.feat` para specs
4. Veja `Context/ArquiteturaPastas.md` para estrutura

---

## ⚠️ TROUBLESHOOTING

### **Problema: Porta já em uso**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### **Problema: Node modules corrompidos**

```bash
rm -rf node_modules package-lock.json
npm install
```

### **Problema: Cache do Next.js**

```bash
rm -rf .next
npm run dev
```

### **Problema: Prisma out of sync**

```bash
npx prisma generate
npx prisma db push
```

---

## 🎯 CHECKLIST RÁPIDO

**Antes de começar:**

- [ ] `git pull origin main`
- [ ] `npm install` (se houver mudanças)
- [ ] Ler `ULTIMA-SESSAO.md`
- [ ] Iniciar frontend e backend

**Durante desenvolvimento:**

- [ ] Testar em tempo real
- [ ] Commitar frequentemente
- [ ] Documentar mudanças importantes

**Ao finalizar:**

- [ ] `npm run build` (verificar)
- [ ] `git commit` e `git push`
- [ ] Atualizar `ULTIMA-SESSAO.md`

---

**💡 Dica:** Mantenha este arquivo aberto em uma aba para consulta rápida!
