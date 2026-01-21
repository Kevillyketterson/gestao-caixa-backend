const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar produtos
router.get('/', async (req,res)=>{
  const result = await pool.query('SELECT * FROM produtos ORDER BY id DESC');
  res.json(result.rows);
});

// Cadastrar produto
router.post('/', async (req,res)=>{
  const { nome, valor } = req.body;
  const result = await pool.query('INSERT INTO produtos (nome, valor) VALUES ($1,$2) RETURNING *',[nome,valor]);
  res.json(result.rows[0]);
});

module.exports = router;
