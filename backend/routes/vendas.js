const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar vendas
router.get('/', async (req, res) => {
  try {
    // Buscar vendas e itens
    const vendasRes = await pool.query('SELECT * FROM vendas ORDER BY id DESC');
    const vendas = vendasRes.rows;

    for (const v of vendas) {
      const itensRes = await pool.query('SELECT * FROM venda_itens WHERE venda_id=$1', [v.id]);
      v.itens = itensRes.rows;
    }

    res.json(vendas);
  } catch (err) {
    console.error('Erro ao buscar vendas:', err);
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
});

// Registrar venda
router.post('/', async (req, res) => {
  try {
    const { cliente, itens } = req.body;
    if (!cliente || !itens || !itens.length) return res.status(400).json({ error: 'Dados inválidos' });

    const totalVenda = itens.reduce((sum, i) => sum + i.total, 0);

    // Criar venda
    const resultVenda = await pool.query(
      'INSERT INTO vendas (cliente, total) VALUES ($1, $2) RETURNING *',
      [cliente, totalVenda]
    );

    const vendaId = resultVenda.rows[0].id;

    // Inserir itens
    for (const item of itens) {
      await pool.query(
        'INSERT INTO venda_itens (venda_id, produto, valor, desconto, total) VALUES ($1,$2,$3,$4,$5)',
        [vendaId, item.produto, item.valor, item.desconto, item.total]
      );
    }

    res.json({ venda: resultVenda.rows[0], itens });
  } catch (err) {
    console.error('Erro ao registrar venda:', err);
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
});

module.exports = router;
