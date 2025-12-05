# 🎯 GUIA COMPLETO - SISTEMA DE RELATÓRIOS VEROT

## 📋 Fluxo de Trabalho

### **1. Verot gera análise tributária** (Sistema Parceiro)

- Cliente é auditado no sistema Verot
- Verot identifica oportunidades de recuperação tributária
- Excel é exportado com os dados da auditoria

### **2. Admin do Ultra CRM faz upload** (Nossa Plataforma)

- Admin acessa `/ultracrm/reports`
- Seleciona o cliente na lista
- Faz upload do Excel do Verot
- Sistema processa automaticamente

### **3. Sistema processa e gera relatório**

- Excel é analisado linha por linha
- Dados são estruturados (tributos, valores, percentuais)
- IA gera insights automáticos
- PDF profissional é criado

### **4. Cliente recebe e visualiza**

- Link é enviado por email (opcional)
- Cliente acessa portal com login
- Visualiza relatório interativo
- Pode baixar PDF

---

## 🚀 IMPLEMENTADO

### **Backend (API):**

✅ `/api/routes/reports.routes.js` - Endpoints completos

- `POST /api/reports/upload/:clientId` - Upload de Excel
- `GET /api/reports/client/:clientId` - Listar relatórios do cliente
- `GET /api/reports/:reportId` - Ver relatório específico
- `GET /api/reports/pdf/:reportId` - Download do PDF
- `PATCH /api/reports/:reportId/send` - Marcar como enviado
- `DELETE /api/reports/:reportId` - Deletar relatório

✅ `/api/models/AuditReport.js` - Schema do banco

- Dados do cliente
- Dados da auditoria (do Excel)
- Caminho do PDF
- Status (generated/sent/viewed)

✅ `/api/services/excelProcessor.js` - Processador de Excel

- Lê arquivos .xlsx, .xls, .csv
- Extrai tributos e valores
- Calcula totais e percentuais
- Gera insights automáticos

✅ `/api/services/pdfGenerator.js` - Gerador de PDF

- Capa profissional
- Sumário executivo
- Análise detalhada (tabela)
- Insights e recomendações
- Próximos passos

### **Frontend (React):**

✅ `/pages/ReportGenerator.tsx` - Interface de Admin

- Seleção de cliente
- Upload de Excel (drag & drop)
- Visualização de resultado
- Download do PDF
- Envio para cliente

---

## 📊 EXEMPLO DE USO

### **1. Admin acessa a página:**

```
http://localhost:3000/#/ultracrm/reports
```

### **2. Seleciona cliente:**

```
Empresa XYZ Ltda - João Silva
```

### **3. Faz upload do Excel do Verot:**

```
📄 relatorio_verot_empresa_xyz.xlsx
📏 Tamanho: 125 KB
```

### **4. Sistema processa (30 segundos):**

```
✅ Excel processado
✅ 8 tributos identificados
✅ R$ 450.000,00 recuperáveis
✅ PDF gerado
```

### **5. Admin visualiza resultado:**

```
┌─────────────────────────────────────┐
│ ✅ Relatório Gerado com Sucesso!    │
├─────────────────────────────────────┤
│ Total Recuperável: R$ 450.000,00    │
│ Tributos Analisados: 8              │
│ Status: Concluído                   │
├─────────────────────────────────────┤
│ Insights:                           │
│ • ICMS maior oportunidade (R$ 200k) │
│ • Total excelente (R$ 450k)         │
│ • Iniciar recuperação imediatamente │
├─────────────────────────────────────┤
│ [Download PDF] [Enviar para Cliente]│
└─────────────────────────────────────┘
```

---

## 🗂️ ESTRUTURA DO EXCEL DO VEROT

### **Formato Esperado:**

| Tributo | Valor Recuperável | Percentual | Período | Observações |
|---------|-------------------|------------|---------|-------------|
| ICMS    | R$ 200.000,00     | 44,4%      | 2019-2024| Crédito acumulado |
| PIS     | R$ 100.000,00     | 22,2%      | 2019-2024| Base de cálculo |
| COFINS  | R$ 80.000,00      | 17,8%      | 2019-2024| Base de cálculo |

**Nota**: O processador é flexível e aceita variações de nomes de colunas:

- "Tributo" ou "Tipo de Tributo" ou "Imposto"
- "Valor Recuperável" ou "Valor" ou "Montante"
- "Percentual" ou "%" ou "Porcentagem"

---

## 📄 ESTRUTURA DO PDF GERADO

```
┌─────────────────────────────────────┐
│          ULTRA TAX                  │
│  Relatório de Auditoria Tributária  │
├─────────────────────────────────────┤
│ Cliente: Empresa XYZ Ltda           │
│ CNPJ: 12.345.678/0001-90            │
│ Período: 2019-2024                  │
│ Data: 04/12/2024                    │
├─────────────────────────────────────┤
│                                     │
│     TOTAL RECUPERÁVEL               │
│     R$ 450.000,00                   │
│                                     │
└─────────────────────────────────────┘

[NOVA PÁGINA]

┌─────────────────────────────────────┐
│ Sumário Executivo                   │
├─────────────────────────────────────┤
│ Este relatório apresenta...         │
│                                     │
│ Tributos Analisados:                │
│ • ICMS: R$ 200.000,00 (44,4%)       │
│ • PIS: R$ 100.000,00 (22,2%)        │
│ • COFINS: R$ 80.000,00 (17,8%)      │
└─────────────────────────────────────┘

[NOVA PÁGINA]

┌─────────────────────────────────────┐
│ Análise Detalhada                   │
├─────────────────────────────────────┤
│ Tributo     │ Valor      │ %       │
│──────────────────────────────────────│
│ ICMS        │ 200.000,00 │ 44,4%   │
│ PIS         │ 100.000,00 │ 22,2%   │
│ COFINS      │  80.000,00 │ 17,8%   │
└─────────────────────────────────────┘

[NOVA PÁGINA]

┌─────────────────────────────────────┐
│ Recomendações                       │
├─────────────────────────────────────┤
│ 1. HIGHLIGHT                        │
│    O tributo ICMS representa...     │
│                                     │
│ 2. OPPORTUNITY                      │
│    Total recuperável de R$ 450k...  │
│                                     │
│ 3. ACTION                           │
│    Recomendamos iniciar...         │
└─────────────────────────────────────┘

[NOVA PÁGINA]

┌─────────────────────────────────────┐
│ Próximos Passos                     │
├─────────────────────────────────────┤
│ 1. Análise jurídica dos créditos    │
│ 2. Preparação da documentação       │
│ 3. Protocolo dos pedidos            │
│ 4. Acompanhamento junto aos órgãos  │
│ 5. Recebimento dos valores          │
└─────────────────────────────────────┘
```

---

## 🔧 INTEGRAÇÃO NO SERVER.JS

Adicione no `api/server.js`:

```javascript
// Import routes
const reportsRoutes = require('./routes/reports.routes');
const AuditReport = require('./models/AuditReport');

// Set models (para usar nos routes)
app.set('models', {
  Client: require('./models/Client'), // Se já existir
  AuditReport
});

// Use routes
app.use('/api/reports', reportsRoutes);

// Servir arquivos PDF estaticamente
app.use('/reports', express.static(path.join(__dirname, 'reports')));
```

---

## 🎯 PRÓXIMOS PASSOS

### **1. Integrar Rotas no Server:**

```bash
# Editar api/server.js
# Adicionar imports e routes conforme acima
```

### **2. Adicionar Rota no App.tsx:**

```tsx
import ReportGenerator from './pages/ReportGenerator';

// Dentro de <Routes>
<Route path="/ultracrm/reports" element={<ReportGenerator />} />
```

### **3. Testar o Fluxo:**

```bash
# 1. Iniciar API
cd api
npm start

# 2. Iniciar Frontend
npm run dev

# 3. Acessar
http://localhost:3000/#/ultracrm/reports
```

### **4. Upload de Excel do Verot:**

- Selecionar cliente
- Fazer upload
- Ver resultado
- Baixar PDF

---

## 📊 BANCO DE DADOS

### **Collection: auditreports**

```javascript
{
  _id: ObjectId("..."),
  client_id: ObjectId("..."),
  company_name: "Empresa XYZ",
  cnpj: "12.345.678/0001-90",
  audit_data: {
    summary: {
      total_recoverable: 450000,
      total_taxes: 8,
      period_analyzed: "2019-2024"
    },
    tributos: [
      {
        tax_name: "ICMS",
        recoverable_amount: 200000,
        percentage: 44.4
      }
      // ...
    ],
    insights: [...]
  },
  excel_filename: "relatorio_verot.xlsx",
  pdf_path: "/api/reports/relatorio_xyz_123456.pdf",
  pdf_url: "/reports/relatorio_xyz_123456.pdf",
  generated_at: ISODate("2024-12-04T12:00:00Z"),
  status: "generated"
}
```

---

## ✅ STATUS FINAL

**Backend**: ✅ 100% Pronto  
**Frontend**: ✅ 100% Pronto  
**Integração**: ⏳ Pendente (adicionar routes no server.js)  
**Testes**: ⏳ Pendente

**Próximo comando**: Integrar routes no `api/server.js` e testar! 🚀
