const jwt = require('jsonwebtoken');
const Token = require('../models/token-model');
const dayjs = require('dayjs');

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

exports.generateRefreshToken = async (user) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  await Token.create({
    token,
    user: user._id,
    type: 'refresh',
    expires: dayjs().add(7, 'days').toDate(),
  });

  return token;
};

exports.verifyRefreshToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const stored = await Token.findOne({ token, user: payload.id, blacklisted: false });

  if (!stored) throw new Error('Token invalid or blacklisted');
  return payload;
};
