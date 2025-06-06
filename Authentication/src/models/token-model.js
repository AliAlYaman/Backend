const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['refresh'], required: true },
  expires: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);
