const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  elo:      { type: Number, default: 1000 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
