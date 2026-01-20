const express = require('express');
const router = express.Router();
const pool = require('../db');

// Criar tabela produtos
pool.query(`
  CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    valor NUMERIC(10,2) NOT NULL
  )
`).catch(err => console.error('Erro ao criar tabela produtos:', err));

// Listar produtos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Criar produto
router.post('/', async (req, res) => {
  try {
    const { nome, valor } = req.body;
    if (!nome || valor == null) return res.status(400).json({ error: 'Nome e valor obrigatórios' });

    const result = await pool.query(
      'INSERT INTO produtos (nome, valor) VALUES ($1, $2) RETURNING *',
      [nome, valor]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

module.exports = router;
