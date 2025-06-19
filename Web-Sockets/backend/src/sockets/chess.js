const { Chess } = require("chess.js");
const Room = require("../models/room-model");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join_room", async ({ roomId, playerName }) => {
      let room = await Room.findOne({ roomId });

      if (!room) {
        // First player joins
        const game = new Chess();
        room = new Room({
          roomId,
          whitePlayer: playerName,
          fen: game.fen(),
        });
        await room.save();
        socket.join(roomId);
        socket.emit("player_assigned", { color: "white", gameState: room });
        return;
      }

      // If room exists
      if (!room.blackPlayer && room.whitePlayer !== playerName) {
        room.blackPlayer = playerName;
        room.gameStarted = true;
        await room.save();
      }

      socket.join(roomId);
      const color = room.whitePlayer === playerName ? "white" : "black";
      socket.emit("player_assigned", { color, gameState: room });
      socket.to(roomId).emit("player_joined", room);
    });

    socket.on("make_move", async ({ roomId, from, to, playerName }) => {
      const room = await Room.findOne({ roomId });
      if (!room || !room.gameStarted) return;

      const game = new Chess(room.fen);
      const move = game.move({ from, to });
      if (!move) return;

      const newFen = game.fen();
      const turn = game.turn();

      const newMove = {
        from,
        to,
        piece: move.piece,
        captured: move.captured || null,
        promotion: move.promotion || null,
        timestamp: Date.now(),
        player: playerName,
      };

      room.fen = newFen;
      room.currentTurn = turn;
      room.moves.push(newMove);
      await room.save();

      io.to(roomId).emit("move_made", {
        from,
        to,
        gameState: room,
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });

    socket.on("leave_game", async ({ roomId, playerName }) => {
  const room = await Room.findOne({ roomId });
  if (!room) return;

  let message = "";

  if (room.whitePlayer === playerName) {
    room.whitePlayer = null;
    message = "White player left the game.";
  } else if (room.blackPlayer === playerName) {
    room.blackPlayer = null;
    message = "Black player left the game.";
  }

  // End the game if either player leaves
  room.gameStarted = false;
  await room.save();

  socket.leave(roomId);
  io.to(roomId).emit("player_left", {
    gameState: room,
    message,
  });

  console.log(message);
});

  });
};
