import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminUserSchema } from './schemas/admin-user.schema';

async function createAdmin() {
  await mongoose.connect('mongodb://localhost:27017/ultra_systems');
  const AdminUserModel = mongoose.model('AdminUser', AdminUserSchema);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);

  const admin = new AdminUserModel({
    email: 'admin@ultrasystemsgroup.com.br',
    password: hashedPassword,
    name: 'Admin',
    is_active: true,
  });

  await admin.save();
  console.log('Admin user created successfully');
  await mongoose.disconnect();
}

createAdmin();
