const User = require('../models/user-model');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ email, password });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(201).json({
    message: "User registered",
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: { id: user._id, email: user.email }
  });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken });
};


exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await Token.findOneAndUpdate({ token: refreshToken }, { blacklisted: true });
  res.status(200).json({ message: 'Logged out' });
};