const activeGames = {}

module.exports = (io) => {
  const rooms = {}; // roomId -> array of usernames

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);
    socket.username = username;
    socket.roomId = roomId;

    // Initialize room array if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    // Avoid adding duplicate usernames
    if (!rooms[roomId].includes(username)) {
      rooms[roomId].push(username);
    }

    console.log(`Room ${roomId} has users:`, rooms[roomId]);

    // Notify all players of current user list
    io.to(roomId).emit("players-update", rooms[roomId]);

    // Start game if 2 players have joined
    if (rooms[roomId].length === 2) {
      io.to(roomId).emit("start-game", {
        white: rooms[roomId][0],
        black: rooms[roomId][1],
      });
    }
  });

  socket.on("disconnect", () => {
    const { username, roomId } = socket;
    if (roomId && rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((name) => name !== username);
      io.to(roomId).emit("players-update", rooms[roomId]);
    }
  });

  socket.on("move", ({ roomId, from, to }) => {
  // Simply relay move to other clients
  socket.to(roomId).emit("move", { from, to })
})

});

}
