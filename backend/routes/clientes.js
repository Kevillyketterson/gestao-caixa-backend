const express = require('express');
const router = express.Router();
const pool = require('../db');

// =======================
// CRIAR TABELA
// =======================
pool.query(`
  CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL
  )
`).catch(err => console.error('Erro ao criar tabela clientes:', err));

// =======================
// LISTAR CLIENTES
// =======================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// =======================
// CADASTRAR CLIENTE
// =======================
router.post('/', async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ error: 'Nome obrigatório' });

    const result = await pool.query(
      'INSERT INTO clientes (nome) VALUES ($1) RETURNING *',
      [nome]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

module.exports = router;
