const mongoose = require('../database/connect');
const User = require('../models/user-model');
require('dotenv').config();

(async () => {
  try {
    await User.deleteMany({});
    await User.create({ username: 'admin', email: 'admin@chess.com', password: 'admin123' });
    console.log('🌱 Seeding complete');
    process.exit(0);
  } catch (e) {
    console.error('❌ Seed error', e);
    process.exit(1);
  }
})();
