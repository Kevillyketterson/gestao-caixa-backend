const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes');

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// HEALTH CHECK
// =======================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API rodando 🚀' });
});

// =======================
// ROTAS
// =======================
app.use('/clientes', clientesRoutes);

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
