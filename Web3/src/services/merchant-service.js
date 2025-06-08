const db = require('../database/index');

exports.findByEmail = async (email) => {
  const result = await db.query('SELECT * FROM merchants WHERE email = $1', [email]);
  return result.rows[0];
};

exports.create = async ({ email, passwordHash }) => {
  const result = await db.query(
    'INSERT INTO merchants (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, passwordHash]
  );
  return result.rows[0];
};

exports.findById = async (id) => {
  const result = await db.query('SELECT * FROM merchants WHERE id = $1', [id]);
  return result.rows[0];
};
