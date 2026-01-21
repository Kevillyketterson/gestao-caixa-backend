const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar clientes
router.get('/', async (req,res)=>{
  try {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
    res.json(result.rows);
  } catch(e){
    console.error('Erro ao listar clientes:', e);
    res.status(500).json({error:'Erro ao listar clientes'});
  }
});

// Cadastrar cliente
router.post('/', async (req,res)=>{
  try {
    const { nome } = req.body;
    if(!nome) return res.status(400).json({error:'Nome é obrigatório'});
    const result = await pool.query('INSERT INTO clientes (nome) VALUES ($1) RETURNING *',[nome]);
    res.json(result.rows[0]);
  } catch(e){
    console.error('Erro ao cadastrar cliente:', e);
    res.status(500).json({error:'Erro ao cadastrar cliente'});
  }
});

module.exports = router;
