const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar vendas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vendas ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar vendas:', err);
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
});

// Registrar venda
router.post('/', async (req, res) => {
  try {
    let { cliente, produto, valor, desconto, total } = req.body;

    // Converter para números
    valor = parseFloat(valor);
    desconto = parseFloat(desconto);
    total = parseFloat(total);

    if (!cliente || !produto || isNaN(valor) || isNaN(desconto) || isNaN(total)) {
      return res.status(400).json({ error: 'Dados inválidos para a venda' });
    }

    const result = await pool.query(
      `INSERT INTO vendas (cliente, produto, valor, desconto, total)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [cliente, produto, valor, desconto, total]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao registrar venda:', err);
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
});

module.exports = router;
