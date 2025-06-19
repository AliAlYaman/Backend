const mongoose = require("mongoose");

const MoveSchema = new mongoose.Schema({
  from: String,
  to: String,
  piece: String,
  captured: String,
  promotion: String,
  timestamp: Number,
  player: String,
});

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  whitePlayer: { type: String, default: null },
  blackPlayer: { type: String, default: null },
  gameStarted: { type: Boolean, default: false },
  currentTurn: { type: String, default: "w" },
  fen: { type: String, required: true },
  moves: [MoveSchema],
});

module.exports = mongoose.model("Room", RoomSchema);
