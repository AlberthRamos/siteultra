const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ultra-systems-secret-key-change-in-production';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token não fornecido'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido ou expirado'
        });
    }
};

// Middleware to verify admin email domain
const verifyAdminDomain = (email) => {
    return email.endsWith('@ultrasystemsgroup.com.br');
};

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id || user.id,
            email: user.email,
            role: 'admin'
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

module.exports = {
    verifyToken,
    verifyAdminDomain,
    generateToken,
    JWT_SECRET
};
