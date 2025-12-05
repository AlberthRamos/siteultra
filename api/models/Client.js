const mongoose = require('mongoose');

/**
 * Schema de Cliente - Para referência nos relatórios
 * (Versão simplificada - você pode ter um schema mais completo)
 */
const clientSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    cnpj: String,
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
