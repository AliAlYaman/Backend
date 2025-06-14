const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/token-model');

exports.createAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
};

exports.createRefreshToken = async (user) => {
  const refreshToken = crypto.randomBytes(40).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt,
  });

  return refreshToken;
};

exports.verifyRefreshToken = async (token) => {
  const tokenDoc = await RefreshToken.findOne({ token }).populate('userId');
  if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    throw new Error('Invalid or expired refresh token');
  }

  return tokenDoc.userId;
};

exports.revokeRefreshToken = async (token) => {
  await RefreshToken.deleteOne({ token });
};
