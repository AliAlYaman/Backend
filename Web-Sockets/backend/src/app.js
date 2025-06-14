const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth-routes');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth', authRoutes);


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
