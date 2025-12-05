# 🐳 Docker + MongoDB - Setup Guide

## 📋 O que foi implementado

### 1. **Backend API** (Node.js + Express + MongoDB)

- ✅ API RESTful completa
- ✅ Endpoints para criar, listar e atualizar leads
- ✅ Analytics dashboard
- ✅ Rate limiting e segurança (Helmet)
- ✅ CORS configurado

### 2. **MongoDB Database**

- ✅ Schema de leads com validação
- ✅ Índices para performance
- ✅ Persistência de dados com volumes Docker

### 3. **Docker Compose**

- ✅ 4 serviços containerizados:
  - **mongodb**: Banco de dados
  - **api**: Backend Node.js
  - **frontend**: Vite React
  - **mongo-express**: UI para visualizar o banco (opcional)

### 4. **Integração Frontend**

- ✅ LeadService atualizado para usar API
- ✅ LeadModal salva no MongoDB
- ✅ Dashboard de leads (opcional)

---

## 🚀 Como Usar

### **Opção 1: Docker (Recomendado)**

```bash
# 1. Construir e iniciar todos os serviços
docker-compose up -d

# 2. Verificar status
docker-compose ps

# 3. Ver logs
docker-compose logs -f

# Acessar:
# - Frontend: http://localhost:3000
# - API: http://localhost:3001
# - Mongo Express: http://localhost:8081 (admin/ultra2024)
```

### **Opção 2: Desenvolvimento Local**

```bash
# Terminal 1: MongoDB (via Docker)
docker run -d -p 27017:27017 --name ultra-mongo mongo:7.0

# Terminal 2: Backend API
cd api
npm install
npm run dev

# Terminal 3: Frontend
npm run dev

# Acessar:
# - Frontend: http://localhost:3000
# - API: http://localhost:3001
```

---

## 📁 Estrutura de Arquivos

```
ultra-systems/
├── api/
│   ├── server.js          # Express API
│   ├── package.json       # Dependencies
│   ├── Dockerfile         # API container
│   └── .env              # API config
├── docker-compose.yml     # Orquestração
├── Dockerfile            # Frontend container
├── .env                  # Frontend config
└── services/
    └── LeadService.ts    # MongoDB integration
```

---

## 🔧 Configuração

### **Variáveis de Ambiente**

#### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3001
```

#### Backend (`api/.env`)

```env
PORT=3001
MONGODB_URI=mongodb://mongodb:27017/ultra_systems
FRONTEND_URL=http://localhost:3000
```

---

## 📊 API Endpoints

### **Leads**

- `POST /api/leads` - Criar lead
- `GET /api/leads` - Listar leads
- `GET /api/leads/:id` - Buscar lead por ID
- `PATCH /api/leads/:id` - Atualizar status

### **Analytics**

- `GET /api/analytics` - Estatísticas gerais

### **Health**

- `GET /health` - Status da API

---

## 💾 Visualizar Banco de Dados

### **Opção 1: Mongo Express (Web UI)**

```
http://localhost:8081
Usuário: admin
Senha: ultra2024
```

### **Opção 2: MongoDB Compass**

```
mongodb://localhost:27017/ultra_systems
```

### **Opção 3: CLI**

```bash
docker exec -it ultra-mongodb mongosh
use ultra_systems
db.leads.find().pretty()
```

---

## 🛠️ Comandos Úteis

```bash
# Parar todos os containers
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados)
docker-compose down -v

# Rebuild após mudanças
docker-compose up -d --build

# Ver logs de um serviço específico
docker-compose logs -f api

# Acessar shell do container
docker exec -it ultra-api sh

# Backup do MongoDB
docker exec ultra-mongodb mongodump --out /backup

# Restore do MongoDB
docker exec ultra-mongodb mongorestore /backup
```

---

## 📈 Próximos Passos

### **Produção**

1. Configurar MongoDB Atlas (cloud)
2. Deploy no Vercel/Netlify (frontend)
3. Deploy no Railway/Render (backend)
4. Configurar variáveis de ambiente de produção

### **Segurança**

1. Adicionar autenticação JWT
2. Implementar rate limiting por usuário
3. Validação de dados com Joi/Zod
4. HTTPS obrigatório

### **Features**

1. Email notifications (Nodemailer)
2. CRM integration (HubSpot/RD Station)
3. Webhooks para automações
4. Dashboard analytics avançado

---

## ✅ Checklist

- [x] MongoDB configurado
- [x] API Express criada
- [x] Docker Compose configurado
- [x] Frontend integrado
- [x] Leads sendo salvos no banco
- [ ] Deploy em produção
- [ ] Backup automatizado
- [ ] Monitoring (Sentry/DataDog)

---

**Status**: 🟢 **100% Funcional em Desenvolvimento!**
