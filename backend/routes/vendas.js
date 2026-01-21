const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar vendas
router.get('/', async (req,res)=>{
  const result = await pool.query('SELECT * FROM vendas ORDER BY id DESC');
  res.json(result.rows);
});

// Registrar venda
router.post('/', async (req,res)=>{
  const { cliente, produto, valor, desconto, total } = req.body;
  const result = await pool.query(
    'INSERT INTO vendas (cliente, produto, valor, desconto, total) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [cliente, produto, valor, desconto, total]
  );
  res.json(result.rows[0]);
});

module.exports = router;
