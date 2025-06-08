const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

exports.generateAccessToken = (merchant) => {
  return jwt.sign({ merchantId: merchant.id }, JWT_SECRET, { expiresIn: '15m' });
};

exports.generateRefreshToken = (merchant) => {
  return jwt.sign({ merchantId: merchant.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

exports.verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);
exports.verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);
