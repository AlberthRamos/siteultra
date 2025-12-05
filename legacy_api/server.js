const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'ultra-systems-secret-key-2024';

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ultra_systems';
let isMongoConnected = false;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log('✅ MongoDB connected');
        isMongoConnected = true;
    })
    .catch(err => {
        console.warn('⚠️  MongoDB not available, using in-memory storage');
        isMongoConnected = false;
    });

// Admin User Schema
const adminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return v.endsWith('@ultrasystemsgroup.com.br');
            },
            message: 'Email deve ser @ultrasystemsgroup.com.br'
        }
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    last_login: Date,
    is_active: { type: Boolean, default: true }
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// Lead Schema
const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    role: String,
    service: { type: String, required: true },
    source_page: String,
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
    ip_address: String,
    user_agent: String,
    created_at: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted', 'lost'], default: 'new' }
});

const Lead = mongoose.model('Lead', leadSchema);

// In-memory storage fallback
let inMemoryLeads = [];
let inMemoryAdmins = [];

// Auth Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token inválido' });
    }
};

// ========================================
// PUBLIC ROUTES
// ========================================

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date(), mongo: isMongoConnected });
});

// Create lead (public)
app.post('/api/leads', async (req, res) => {
    try {
        const leadData = {
            ...req.body,
            ip_address: req.ip,
            user_agent: req.get('user-agent'),
            created_at: new Date()
        };

        if (isMongoConnected) {
            const lead = new Lead(leadData);
            await lead.save();
            res.status(201).json({ success: true, message: 'Lead captured', leadId: lead._id });
        } else {
            const lead = { ...leadData, _id: Date.now().toString(), status: 'new' };
            inMemoryLeads.push(lead);
            res.status(201).json({ success: true, message: 'Lead captured', leadId: lead._id });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving lead', error: error.message });
    }
});

// Get leads (public for now - for LeadsDashboard)
app.get('/api/leads', async (req, res) => {
    try {
        if (isMongoConnected) {
            const leads = await Lead.find().sort({ created_at: -1 });
            res.json({ success: true, data: leads });
        } else {
            res.json({ success: true, data: inMemoryLeads.reverse() });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error', error: error.message });
    }
});

// ========================================
// AUTH ROUTES (Simple Password)
// ========================================

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email domain
        if (!email.endsWith('@ultrasystemsgroup.com.br')) {
            return res.status(403).json({
                success: false,
                message: 'Apenas emails @ultrasystemsgroup.com.br são permitidos'
            });
        }

        let user;
        if (isMongoConnected) {
            user = await AdminUser.findOne({ email, is_active: true });
        } else {
            user = inMemoryAdmins.find(u => u.email === email && u.is_active);
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Senha incorreta'
            });
        }

        // Update last login
        if (isMongoConnected) {
            user.last_login = new Date();
            await user.save();
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login realizado',
            token,
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro no login', error: error.message });
    }
});

// Verify token
app.get('/api/auth/verify', verifyToken, (req, res) => {
    res.json({ success: true, user: req.user });
});

// ========================================
// ADMIN USER MANAGEMENT (Protected)
// ========================================

// Create admin user
app.post('/api/admin/users', verifyToken, async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email.endsWith('@ultrasystemsgroup.com.br')) {
            return res.status(403).json({
                success: false,
                message: 'Email deve ser @ultrasystemsgroup.com.br'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (isMongoConnected) {
            const existing = await AdminUser.findOne({ email });
            if (existing) {
                return res.status(400).json({ success: false, message: 'Usuário já existe' });
            }

            const user = await AdminUser.create({
                email,
                name,
                password: hashedPassword,
                is_active: true
            });

            res.status(201).json({
                success: true,
                message: 'Usuário criado',
                user: { id: user._id, email: user.email, name: user.name }
            });
        } else {
            const user = {
                _id: Date.now().toString(),
                email,
                name,
                password: hashedPassword,
                is_active: true,
                created_at: new Date()
            };
            inMemoryAdmins.push(user);
            res.status(201).json({
                success: true,
                message: 'Usuário criado',
                user: { id: user._id, email, name }
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro', error: error.message });
    }
});

// List admin users
app.get('/api/admin/users', verifyToken, async (req, res) => {
    try {
        if (isMongoConnected) {
            const users = await AdminUser.find().select('-password').sort({ created_at: -1 });
            res.json({ success: true, data: users });
        } else {
            const users = inMemoryAdmins.map(u => ({ ...u, password: undefined }));
            res.json({ success: true, data: users });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro', error: error.message });
    }
});

// ========================================
// CRM LEADS (Protected)
// ========================================

app.get('/api/crm/leads', verifyToken, async (req, res) => {
    try {
        const { status, service } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (service) filter.service = service;

        if (isMongoConnected) {
            const leads = await Lead.find(filter).sort({ created_at: -1 });
            const total = await Lead.countDocuments(filter);
            res.json({ success: true, data: leads, total });
        } else {
            let filtered = [...inMemoryLeads];
            if (status) filtered = filtered.filter(l => l.status === status);
            if (service) filtered = filtered.filter(l => l.service === service);
            res.json({ success: true, data: filtered, total: filtered.length });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error', error: error.message });
    }
});

app.patch('/api/crm/leads/:id', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        if (isMongoConnected) {
            const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
            res.json({ success: true, data: lead });
        } else {
            const lead = inMemoryLeads.find(l => l._id === req.params.id);
            if (lead) lead.status = status;
            res.json({ success: true, data: lead });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error', error: error.message });
    }
});

// Analytics
app.get('/api/analytics', async (req, res) => {
    try {
        if (isMongoConnected) {
            const total = await Lead.countDocuments();
            const byStatus = await Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
            res.json({ success: true, data: { total, byStatus } });
        } else {
            res.json({ success: true, data: { total: inMemoryLeads.length, byStatus: [] } });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 API running on port ${PORT}`);
});
