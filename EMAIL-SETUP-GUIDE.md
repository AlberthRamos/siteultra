# 🔐 CONFIGURAÇÃO DO EMAIL - Google Workspace

## 📧 **Passo a Passo para Configurar**

### **1. Gerar Senha de App no Google**

1. Acesse: <https://myaccount.google.com/apppasswords>
2. Faça login com: `infra@ultrasystemsgroup.com.br`
3. Se não aparecer a opção "Senhas de app":
   - Primeiro ative a "Verificação em duas etapas"
   - Acesse: <https://myaccount.google.com/security>
   - Clique em "Verificação em duas etapas" e ative

4. Depois de ativar 2FA, volte para: <https://myaccount.google.com/apppasswords>
5. Em "Selecionar app": escolha "Email"
6. Em "Selecionar dispositivo": escolha "Outro" e digite "Ultra CRM"
7. Clique em "Gerar"
8. **COPIE A SENHA DE 16 CARACTERES** (ex: `abcd efgh ijkl mnop`)

### **2. Configurar no Projeto**

Edite o arquivo `api/.env` e cole a senha gerada:

```env
# Google Workspace Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=infra@ultrasystemsgroup.com.br
SMTP_PASS=abcdefghijklmnop  # ← COLE AQUI (sem espaços)
```

**IMPORTANTE**:

- Cole a senha SEM ESPAÇOS (remova os espaços que o Google adiciona)
- Exemplo: `abcd efgh ijkl mnop` → `abcdefghijklmnop`

### **3. Criar Usuário Admin**

```bash
cd api
node createAdmin.js
```

Isso criará o usuário:

- **Email**: `infra@ultrasystemsgroup.com.br`
- **Nome**: Infraestrutura Ultra Systems

### **4. Testar**

1. Acesse: <http://localhost:3000/#/ultracrm>
2. Digite: `infra@ultrasystemsgroup.com.br`
3. Clique em "Enviar Código de Acesso"
4. Verifique o email `infra@ultrasystemsgroup.com.br`
5. Digite o código de 6 dígitos
6. ✅ Acesso liberado!

---

## 🔧 **Configuração Atual**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=infra@ultrasystemsgroup.com.br
SMTP_PASS=COLE_AQUI_A_SENHA_DE_APP_GERADA
```

---

## 🚨 **Troubleshooting**

### **Erro: "Invalid login"**

- Verifique se ativou a verificação em 2 etapas
- Gere uma nova senha de app
- Cole a senha SEM espaços

### **Erro: "Connection timeout"**

- Verifique se a porta 587 está aberta
- Tente usar porta 465 com `secure: true`

### **Email não chega**

- Verifique a caixa de spam
- Verifique se o email está correto no `.env`
- Veja os logs da API para erros

---

## 📝 **Configuração Alternativa (Porta 465)**

Se a porta 587 não funcionar, tente:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=infra@ultrasystemsgroup.com.br
SMTP_PASS=sua-senha-de-app
```

E atualize `api/emailService.js`:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,  // ← mude para true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

---

## ✅ **Checklist**

- [ ] Acessar <https://myaccount.google.com/apppasswords>
- [ ] Ativar verificação em 2 etapas (se necessário)
- [ ] Gerar senha de app para "Email"
- [ ] Copiar senha (sem espaços)
- [ ] Colar no arquivo `api/.env`
- [ ] Executar `node createAdmin.js`
- [ ] Testar login em `/ultracrm`

---

**Depois de configurar, reinicie a API:**

```bash
# Pare a API (Ctrl+C)
cd api
npm start
```

**Status**: ⏳ **Aguardando configuração da senha de app**
