const express = require('express');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes');
const produtosRoutes = require('./routes/produtos');
const vendasRoutes   = require('./routes/vendas');

const pool = require('./db');

const app = express();

// =======================
// CORS
// =======================
app.use(cors({
  origin: '*' // pode restringir para a URL do frontend se quiser
}));

app.use(express.json());

// =======================
// Health Check
// =======================
app.get('/health', (req,res)=>{
  res.json({status:'ok', message:'API rodando 🚀'});
});

// =======================
// Rotas
// =======================
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/vendas', vendasRoutes);

// =======================
// Start server
// =======================
const PORT = process.env.PORT || 10000;
app.listen(PORT, async ()=>{
  console.log(`🚀 API rodando na porta ${PORT}`);

  try {
    // Criar tabelas se não existirem
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        valor NUMERIC NOT NULL
      );
      CREATE TABLE IF NOT EXISTS vendas (
        id SERIAL PRIMARY KEY,
        cliente TEXT NOT NULL,
        produto TEXT NOT NULL,
        valor NUMERIC NOT NULL,
        desconto NUMERIC NOT NULL,
        total NUMERIC NOT NULL,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabelas criadas!');
  } catch(err) {
    console.error('Erro ao criar tabelas:', err);
  }
});
