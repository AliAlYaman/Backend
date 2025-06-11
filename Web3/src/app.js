const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth-routes');
const paymentRoutes = require('./routes/payment-routes');
const transferRoutes=  require('./routes/transfer-routes');

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

app.use(cors({
  origin: 'http://localhost:5173', // change to your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/transfer', transferRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
