// File: src/controllers/wallet-controller.js
const { Wallet, ethers } = require("ethers");
const db = require("../database/index");
const crypto = require("crypto");

const encrypt = (text, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

exports.generateWallet = async (req, res) => {
  const { userId } = req.user; // From auth middleware
  const { cryptoType } = req.body;

  try {
    // Check if already exists
    const existing = await db.wallets.findOne({ user_id: userId, crypto_type: cryptoType });
    if (existing) {
      return res.json({ address: existing.public_key });
    }

    const wallet = Wallet.createRandom();
    const encryptedKey = encrypt(wallet.privateKey, process.env.PRIVATE_KEY_SECRET);

    await db.wallets.insert({
      user_id: userId,
      crypto_type: cryptoType,
      public_key: wallet.address,
      private_key: encryptedKey,
    });

    res.json({ address: wallet.address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate wallet" });
  }
};

exports.getUserWallets = async (req, res) => {
  const { userId } = req.user;
  try {
    const wallets = await db.wallets.find({ user_id: userId });
    res.json(wallets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch wallets" });
  }
};