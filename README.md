# Ultra Systems - README

## 🚀 Projeto Full Stack

**Ultra Systems** é uma plataforma completa de Inteligência Tributária e Cibersegurança Ofensiva.

### 🛠️ Stack Tecnológica

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + MongoDB
- **Infraestrutura**: Docker + Docker Compose
- **PWA**: Service Worker + Manifest
- **Analytics**: Google Analytics 4 + Meta Pixel

---

## 📦 Instalação Rápida

### **Opção 1: Docker (Recomendado)**

```bash
# Windows
setup-docker.bat

# Linux/Mac
chmod +x setup-docker.sh
./setup-docker.sh
```

### **Opção 2: Desenvolvimento Local**

```bash
# 1. Instalar dependências do frontend
npm install

# 2. Instalar dependências da API
cd api
npm install
cd ..

# 3. Iniciar MongoDB (Docker)
docker run -d -p 27017:27017 --name ultra-mongo mongo:7.0

# 4. Iniciar API (Terminal 1)
cd api
npm run dev

# 5. Iniciar Frontend (Terminal 2)
npm run dev
```

---

## 🌐 Acessos

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| **Frontend** | <http://localhost:3000> | - |
| **API** | <http://localhost:3001> | - |
| **Mongo Express** | <http://localhost:8081> | admin / ultra2024 |
| **Dashboard Leads** | <http://localhost:3000/#/admin/leads> | - |

---

## 📁 Estrutura do Projeto

```
ultra-systems/
├── api/                    # Backend Node.js
│   ├── server.js          # Express API
│   ├── package.json       # Dependencies
│   └── Dockerfile         # API container
├── components/            # React components
├── pages/                 # React pages
├── services/              # API services
├── public/                # Static files
├── docker-compose.yml     # Docker orchestration
├── Dockerfile            # Frontend container
└── README.md             # This file
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

## 📊 Features Implementadas

### ✅ **Frontend**

- [x] PWA (Progressive Web App)
- [x] Service Worker (offline support)
- [x] Lazy loading de imagens
- [x] FAQ interativo
- [x] Calculadora de economia tributária
- [x] Trust badges e social proof
- [x] Chat widget (Tawk.to)
- [x] Scroll to top button
- [x] Loading screen
- [x] Accessibility (WCAG 2.1)

### ✅ **Backend**

- [x] API RESTful
- [x] MongoDB integration
- [x] CORS configurado
- [x] Rate limiting
- [x] Helmet security
- [x] Analytics endpoint

### ✅ **DevOps**

- [x] Docker Compose
- [x] Multi-container setup
- [x] Volume persistence
- [x] Network isolation
- [x] Health checks

---

## 📝 Scripts Disponíveis

```bash
# Frontend
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview build

# API
cd api
npm start           # Produção
npm run dev         # Desenvolvimento (nodemon)

# Docker
docker-compose up -d              # Iniciar tudo
docker-compose down               # Parar tudo
docker-compose logs -f            # Ver logs
docker-compose restart api        # Reiniciar API
docker-compose down -v            # Parar e limpar volumes
```

---

## 🚀 Deploy

### **Frontend** (Vercel/Netlify)

```bash
npm run build
# Deploy pasta 'dist'
```

### **Backend** (Railway/Render)

```bash
# Push para Git
# Configurar variáveis de ambiente
# Deploy automático
```

### **MongoDB** (MongoDB Atlas)

```bash
# Criar cluster gratuito
# Copiar connection string
# Atualizar MONGODB_URI
```

---

## 📈 Roadmap

- [ ] Autenticação JWT
- [ ] Dashboard analytics avançado
- [ ] Email notifications (Nodemailer)
- [ ] CRM integration (HubSpot)
- [ ] Webhooks
- [ ] Testes E2E (Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] Monitoring (Sentry)

---

## 📄 Licença

Proprietary - Ultra Systems © 2024

---

## 👥 Contato

- **Website**: <https://ultrasystems.com.br>
- **WhatsApp**: (41) 9 9288-1153
- **Email**: <contato@ultrasystems.com.br>

---

**Desenvolvido com ❤️ pela equipe Ultra Systems**
