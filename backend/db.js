const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Neon / Render Postgres
  ssl: { rejectUnauthorized: false }         // necessário para SSL
});

module.exports = pool;
