// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Render exige SSL
});

pool.on('connect', () => console.log('✅ Conectado ao banco de dados!'));
pool.on('error', (err) => console.error('❌ Erro no banco:', err));

module.exports = pool;
