const { Wallet, ethers } = require("ethers");
const db = require("../database/index"); // adjust to your db wrapper
const ERC20_ABI = require("../abis/erc20.json"); // standard ERC20 ABI

exports.transfer = async (req, res) => {
  const { userId } = req.user; // from auth middleware
  const { cryptoType, amount, to, isToken, tokenAddress } = req.body;

  try {
    // 1. Load sender wallet
    const walletRecord = await db.wallets.findOne({ user_id: userId, crypto_type: cryptoType });
    if (!walletRecord) return res.status(404).json({ error: "Wallet not found" });

    const provider = new ethers.JsonRpcProvider(process.env[`RPC_${cryptoType.toUpperCase()}`]);
    const wallet = new Wallet(walletRecord.private_key, provider);

    let tx;
    if (isToken) {
      // 2. Send ERC-20 Token
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(amount.toString(), decimals);
      tx = await contract.transfer(to, parsedAmount);
    } else {
      // 3. Send native crypto
      tx = await wallet.sendTransaction({
        to,
        value: ethers.parseEther(amount.toString()),
      });
    }

    // 4. Save tx
    await db.payments.insert({
      user_id: userId,
      tx_hash: tx.hash,
      crypto_type: cryptoType,
      amount,
      status: "pending",
    });

    res.json({ message: "Transaction sent", txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transaction failed" });
  }
};
