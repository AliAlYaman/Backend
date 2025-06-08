const crypto = require('crypto');
const paymentService = require('../services/payment-service');

exports.createPaymentRequest = async (req, res) => {
  const { amount, currency, description, redirectUrl } = req.body;
  const merchantId = req.merchantId;

  if (!amount || !currency || !redirectUrl) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const id = crypto.randomBytes(16).toString('hex');
  const payment = await paymentService.create({
    id,
    merchantId,
    amount,
    currency,
    description,
    redirectUrl,
  });

  res.status(201).json({ payment });
};

exports.getPaymentRequests = async (req, res) => {
  const merchantId = req.merchantId;
  const payments = await paymentService.getByMerchantId(merchantId);
  res.json({ payments });
};
