// /sockets/chess.js
const { v4: uuidv4 } = require('uuid');

const games = {}; // Store game state: { roomId: { players: [], board: ... } }

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinGame', () => {
      let room = Object.keys(games).find(roomId => games[roomId].players.length === 1);

      if (room) {
        // Join existing room
        games[room].players.push(socket.id);
        socket.join(room);
        io.to(room).emit('startGame', { roomId: room, color: 'black', opponent: games[room].players[0] });
        io.to(games[room].players[0]).emit('startGame', { roomId: room, color: 'white', opponent: socket.id });
      } else {
        // Create new room
        const roomId = uuidv4();
        games[roomId] = { players: [socket.id], board: null };
        socket.join(roomId);
      }
    });

    socket.on('move', ({ roomId, move }) => {
      socket.to(roomId).emit('opponentMove', move);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      for (const roomId in games) {
        const idx = games[roomId].players.indexOf(socket.id);
        if (idx !== -1) {
          games[roomId].players.splice(idx, 1);
          io.to(roomId).emit('opponentLeft');
          if (games[roomId].players.length === 0) delete games[roomId];
        }
      }
    });
  });
};
