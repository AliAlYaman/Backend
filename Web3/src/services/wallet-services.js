const db = require('../database/index'); 
const { ethers } = require('ethers');


const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

async function getUserWallet(userId, cryptoType = 'ETH') {
  const { rows } = await db.query(
    'SELECT * FROM wallets WHERE user_id = $1 AND crypto_type = $2',
    [userId, cryptoType]
  );
  return rows[0];
}

async function sendCrypto({ userId, cryptoType, toAddress, amount }) {
  const walletRecord = await getUserWallet(userId, cryptoType);
  if (!walletRecord) throw new Error('Wallet not found');

  const wallet = new ethers.Wallet(walletRecord.private_key, provider);
  const tx = await wallet.sendTransaction({
    to: toAddress,
    value: ethers.parseEther(amount.toString())
  });

  return tx; // includes tx.hash
}

module.exports = {
  sendCrypto,
};
