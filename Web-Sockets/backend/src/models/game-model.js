import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  white:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  black:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  moves:      [String], // algebraic notation
  result:     { type: String, enum: ["1-0", "0-1", "1/2-1/2", "*"], default: "*" },
  status:     { type: String, enum: ["waiting", "ongoing", "finished"], default: "waiting" },
  createdAt:  { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);
