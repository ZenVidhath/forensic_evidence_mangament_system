require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const existing = await User.findOne({ email: 'admin@fems.gov' });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const admin = new User({
    name: 'Admin',
    email: 'admin@fems.gov',
    password: hashedPassword,
    role: 'admin',
  });

  await admin.save();
  console.log('Admin user created successfully');
  process.exit(0);
}

createAdmin();
