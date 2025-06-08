require('dotenv').config();
const app = require('./app');
const { pool } = require('./database/index');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await pool.connect();
    console.log('✅ Connected to PostgreSQL');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  }
})();
