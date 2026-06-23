// backend/seed.js
const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await User.deleteMany({});
  await User.create([
    { username: 'administrator', password: 'admin123', fullName: 'Super Administrator', role: 'administrator' },
    { username: 'admin', password: 'admin123', fullName: 'Admin Staff', role: 'admin' },
    { username: 'viewer', password: 'viewer123', fullName: 'Viewer User', role: 'viewer' }
  ]);
  console.log('Seed done');
  process.exit();
});