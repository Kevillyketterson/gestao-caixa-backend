const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar clientes
router.get('/', async (req,res)=>{
  const result = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
  res.json(result.rows);
});

// Cadastrar cliente
router.post('/', async (req,res)=>{
  const { nome } = req.body;
  const result = await pool.query('INSERT INTO clientes (nome) VALUES ($1) RETURNING *',[nome]);
  res.json(result.rows[0]);
});

module.exports = router;
