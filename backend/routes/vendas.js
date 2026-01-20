const express = require('express');
const router = express.Router();
const pool = require('../db');

// Criar tabela vendas
pool.query(`
  CREATE TABLE IF NOT EXISTS vendas (
    id SERIAL PRIMARY KEY,
    cliente TEXT NOT NULL,
    produto TEXT NOT NULL,
    valor NUMERIC(10,2) NOT NULL,
    desconto NUMERIC(10,2),
    total NUMERIC(10,2),
    data TIMESTAMP NOT NULL DEFAULT NOW()
  )
`).catch(err => console.error('Erro ao criar tabela vendas:', err));

// Listar vendas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vendas ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
});

// Criar venda
router.post('/', async (req, res) => {
  try {
    const { cliente, produto, valor, desconto, total } = req.body;
    if (!cliente || !produto || total == null) return res.status(400).json({ error: 'Dados incompletos' });

    const result = await pool.query(
      'INSERT INTO vendas (cliente, produto, valor, desconto, total) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [cliente, produto, valor, desconto, total]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
});

module.exports = router;
