const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar produtos
router.get('/', async (req,res)=>{
  try {
    const result = await pool.query('SELECT * FROM produtos ORDER BY id DESC');
    res.json(result.rows);
  } catch(e){
    console.error('Erro ao listar produtos:', e);
    res.status(500).json({error:'Erro ao listar produtos'});
  }
});

// Cadastrar produto
router.post('/', async (req,res)=>{
  try {
    const { nome, valor } = req.body;
    if(!nome || isNaN(valor)) return res.status(400).json({error:'Dados inválidos'});
    const result = await pool.query('INSERT INTO produtos (nome, valor) VALUES ($1,$2) RETURNING *',[nome,valor]);
    res.json(result.rows[0]);
  } catch(e){
    console.error('Erro ao cadastrar produto:', e);
    res.status(500).json({error:'Erro ao cadastrar produto'});
  }
});

// Deletar produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});


module.exports = router;

