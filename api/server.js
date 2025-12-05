const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos PDF est aticamente
app.use('/reports', express.static(path.join(__dirname, 'reports')));

// ========================================
// MONGODB CONNECTION
// ========================================

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ultra_systems';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.warn('⚠️  MongoDB not available:', err.message));

// ========================================
// MODELS
// ========================================

const Client = require('./models/Client');
const AuditReport = require('./models/AuditReport');

// Disponibilizar models para as routes
app.set('models', {
    Client,
    AuditReport
});

// ========================================
// ROUTES
// ========================================

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Mock clients para testes sem MongoDB
const mockClients = [
    { _id: '507f1f77bcf86cd799439011', name: 'João Silva', company: 'Empresa ABC Ltda', email: 'joao@empresaabc.com.br', cnpj: '12.345.678/0001-90' },
    { _id: '507f1f77bcf86cd799439012', name: 'Maria Santos', company: 'Indústria XYZ S.A.', email: 'maria@industriaxyz.com.br', cnpj: '98.765.432/0001-10' },
    { _id: '507f1f77bcf86cd799439013', name: 'Carlos Oliveira', company: 'Comércio Delta Eireli', email: 'carlos@comerciodelta.com.br', cnpj: '11.222.333/0001-44' }
];

app.get('/api/clients', (req, res) => {
    res.json({ success: true, data: mockClients });
});

// Reports routes
const reportsRoutes = require('./routes/reports.routes');
app.use('/api/reports', reportsRoutes);

// News routes
const newsRoutes = require('./routes/news.routes');
app.use('/api/news', newsRoutes);

// ========================================
// ERROR HANDLING
// ========================================

app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log(`🚀 Ultra Systems API running on port ${PORT}`);
    console.log(`📊 Reports: http://localhost:${PORT}/api/reports`);
    console.log(`🏥 Health: http://localhost:${PORT}/health`);
});

module.exports = app;
