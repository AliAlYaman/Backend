const db = require('../database/index');

exports.create = async ({ id, merchantId, amount, currency, description, redirectUrl }) => {
  const result = await db.query(
    `INSERT INTO payment_requests 
    (id, merchant_id, amount, currency, description, redirect_url, status, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW())
    RETURNING *`,
    [id, merchantId, amount, currency, description, redirectUrl]
  );
  return result.rows[0];
};

exports.getByMerchantId = async (merchantId) => {
  const result = await db.query(
    'SELECT * FROM payment_requests WHERE merchant_id = $1 ORDER BY created_at DESC',
    [merchantId]
  );
  return result.rows;
};
