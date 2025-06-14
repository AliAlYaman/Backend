const mongoose = require('mongoose');
require('dotenv').config();

// Optional: load your models here
const User = require('../models/user-model');

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // 🔽 Do your seeding logic here
    await User.create({ 
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      elo : 1000
    });

    console.log('🌱 Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();
