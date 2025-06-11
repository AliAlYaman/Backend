const bcrypt = require('bcrypt');
const merchantService = require('../services/merchant-service');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { Wallet } = require('ethers');
const db = require('../database/index'); // assuming this exports a pg client or pool instance

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await merchantService.findByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user and get created user back
    const user = await merchantService.create({ email, password: passwordHash });

    // ✅ Generate custodial wallet
    const ethWallet = Wallet.createRandom();
    const cryptoType = 'ETH'; // or BTC, etc.

    await db.query(
      `INSERT INTO wallets (user_id, crypto_type, public_key, private_key)
       VALUES ($1, $2, $3, $4)`,
      [user.id, cryptoType, ethWallet.address, ethWallet.privateKey]
    );

    // Generate tokens after successful signup
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'User created',
      accessToken,
      wallet: {
        address: ethWallet.address,
        crypto_type: cryptoType
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await merchantService.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = verifyRefreshToken(token);
    const user = await merchantService.findById(payload.merchantId);
    if (!user) return res.status(401).json({ error: 'Invalid user' });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'Strict',
  });
  res.json({ message: 'Logged out' });
};



exports.generateWallet = () => {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}
