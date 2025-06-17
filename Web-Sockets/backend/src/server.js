const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socketIo = require('socket.io');

dotenv.config();

const app = require('./app');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chess-app';

// 1. Create HTTP server from Express app
const server = http.createServer(app);

// 2. Initialize Socket.IO on top of the HTTP server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // adjust to your frontend URL
    credentials: true,
  },
});

// 3. Import and pass io to your socket handler module
require('./sockets/chess')(io);

// 4. Start the server after connecting to MongoDB
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
