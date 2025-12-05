const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ultra_systems';

const adminUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

async function createFirstAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const count = await AdminUser.countDocuments();

        if (count > 0) {
            console.log('⚠️  Admin already exists');
            const users = await AdminUser.find();
            users.forEach(u => console.log(`  - ${u.name} (${u.email})`));
            process.exit(0);
        }

        // Default password: Ultra@2024
        const hashedPassword = await bcrypt.hash('Ultra@2024', 10);

        const admin = await AdminUser.create({
            email: 'infra@ultrasystemsgroup.com.br',
            name: 'Infraestrutura Ultra Systems',
            password: hashedPassword,
            is_active: true
        });

        console.log('\n✅ Admin created!');
        console.log(`Email: ${admin.email}`);
        console.log(`Password: Ultra@2024`);
        console.log('\nLogin: http://localhost:3000/#/ultracrm\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createFirstAdmin();
