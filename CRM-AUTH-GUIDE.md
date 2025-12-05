# 🔐 ULTRA CRM - Sistema de Autenticação Implementado

## ✅ **IMPLEMENTAÇÃO COMPLETA**

Sistema de CRM administrativo com autenticação por código de acesso via email.

---

## 🎯 **Funcionalidades Implementadas**

### **1. Autenticação Segura**

- ✅ Login apenas com emails `@ultrasystemsgroup.com.br`
- ✅ Código de acesso de 6 dígitos enviado por email
- ✅ Código válido por 10 minutos
- ✅ JWT Token com validade de 24 horas
- ✅ Verificação automática de token

### **2. Gerenciamento de Usuários**

- ✅ Apenas admins autenticados podem criar novos usuários
- ✅ Validação de domínio de email obrigatória
- ✅ Ativação/desativação de usuários
- ✅ Listagem de todos os usuários

### **3. CRM Administrativo**

- ✅ Dashboard com estatísticas
- ✅ Visualização de todos os leads
- ✅ Filtros por status
- ✅ Atualização de status de leads
- ✅ Export para CSV
- ✅ Interface moderna e responsiva

---

## 🚀 **Como Usar**

### **1. Configurar Email (IMPORTANTE)**

Edite o arquivo `api/.env` e adicione suas credenciais SMTP:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app

# JWT Secret (mude em produção)
JWT_SECRET=ultra-systems-secret-key-change-in-production
```

**Para Gmail:**

1. Ative a verificação em 2 etapas
2. Gere uma "Senha de app" em <https://myaccount.google.com/apppasswords>
3. Use essa senha no `SMTP_PASS`

### **2. Criar Primeiro Usuário Admin**

```bash
cd api
node createAdmin.js
```

Isso criará o usuário:

- Email: `admin@ultrasystemsgroup.com.br`
- Nome: Administrador

### **3. Acessar o CRM**

```
http://localhost:3000/#/ultracrm
```

### **4. Fazer Login**

1. Digite seu email `@ultrasystemsgroup.com.br`
2. Clique em "Enviar Código de Acesso"
3. Verifique seu email
4. Digite o código de 6 dígitos
5. ✅ Acesso liberado!

---

## 📊 **Endpoints da API**

### **Autenticação**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/request-code` | Solicitar código de acesso | Não |
| POST | `/api/auth/verify-code` | Verificar código e fazer login | Não |
| GET | `/api/auth/verify` | Verificar se token é válido | Sim |

### **Gerenciamento de Usuários**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/admin/users` | Criar novo usuário admin | Sim |
| GET | `/api/admin/users` | Listar todos os usuários | Sim |
| PATCH | `/api/admin/users/:id/deactivate` | Desativar usuário | Sim |

### **Leads (Protegidos)**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/crm/leads` | Listar leads | Sim |
| PATCH | `/api/crm/leads/:id` | Atualizar status do lead | Sim |

---

## 🔒 **Segurança**

### **Implementado:**

- ✅ Validação de domínio de email
- ✅ Códigos de acesso temporários (10 min)
- ✅ JWT com expiração (24h)
- ✅ Middleware de autenticação
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Helmet security headers

### **Recomendações para Produção:**

- [ ] Usar HTTPS
- [ ] Configurar variáveis de ambiente seguras
- [ ] Implementar refresh tokens
- [ ] Adicionar logs de auditoria
- [ ] Configurar backup automático
- [ ] Implementar 2FA adicional

---

## 👥 **Gerenciar Usuários**

### **Criar Novo Usuário (via API)**

```bash
curl -X POST http://localhost:3001/api/admin/users \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ultrasystemsgroup.com.br",
    "name": "Nome do Usuário"
  }'
```

### **Listar Usuários**

```bash
curl http://localhost:3001/api/admin/users \
  -H "Authorization: Bearer SEU_TOKEN"
```

### **Desativar Usuário**

```bash
curl -X PATCH http://localhost:3001/api/admin/users/USER_ID/deactivate \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 📧 **Exemplo de Email Enviado**

```
Assunto: Código de Acesso - Ultra CRM

Ultra Systems CRM
Seu código de acesso foi gerado

Olá,

Use o código abaixo para acessar o CRM Administrativo:

┌─────────┐
│ 123456  │
└─────────┘

Este código é válido por 10 minutos.

Se você não solicitou este código, ignore este email.

Ultra Systems - Inteligência Tributária e Cibersegurança
Este é um email automático, não responda.
```

---

## 🎨 **Interface do CRM**

### **Tela de Login:**

- Campo de email com validação
- Envio de código por email
- Campo para código de 6 dígitos
- Design moderno e seguro

### **Dashboard:**

- Cards com estatísticas (Total, Novos, Contatados, Convertidos)
- Tabela de leads com filtros
- Atualização de status inline
- Export para CSV
- Botão de logout
- Gerenciamento de usuários

---

## 🔄 **Fluxo de Autenticação**

```
1. Usuário acessa /ultracrm
   ↓
2. Digita email @ultrasystemsgroup.com.br
   ↓
3. API valida domínio e existência do usuário
   ↓
4. API gera código de 6 dígitos
   ↓
5. Código salvo no banco (válido 10 min)
   ↓
6. Email enviado com código
   ↓
7. Usuário digita código
   ↓
8. API valida código
   ↓
9. API gera JWT token (24h)
   ↓
10. Token salvo no localStorage
   ↓
11. ✅ Acesso ao CRM liberado
```

---

## ✅ **Checklist de Implementação**

- [x] Schema de AdminUser no MongoDB
- [x] Schema de AccessCode no MongoDB
- [x] Serviço de envio de email
- [x] Middleware de autenticação JWT
- [x] Rotas de autenticação
- [x] Rotas de gerenciamento de usuários
- [x] Rotas protegidas de leads
- [x] Página de login (/ultracrm)
- [x] Dashboard CRM
- [x] Gerenciamento de status de leads
- [x] Export CSV
- [x] Script para criar primeiro admin
- [x] Documentação completa

---

## 🚨 **Troubleshooting**

### **Email não está sendo enviado:**

1. Verifique as credenciais SMTP no `.env`
2. Para Gmail, use "Senha de app"
3. Verifique se a porta 587 está aberta
4. Veja os logs da API para erros

### **Código inválido:**

1. Código expira em 10 minutos
2. Código só pode ser usado uma vez
3. Solicite um novo código

### **Token expirado:**

1. Faça login novamente
2. Token dura 24 horas

---

## 📝 **Próximos Passos**

### **Melhorias Futuras:**

- [ ] Interface para criar usuários no CRM
- [ ] Dashboard de analytics avançado
- [ ] Notificações em tempo real
- [ ] Histórico de ações dos leads
- [ ] Integração com WhatsApp Business API
- [ ] Relatórios personalizados
- [ ] Funil de vendas visual

---

**Status**: 🟢 **100% FUNCIONAL!**

Acesse: <http://localhost:3000/#/ultracrm>
