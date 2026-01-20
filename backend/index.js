const express = require('express');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes');
const produtosRoutes = require('./routes/produtos');
const vendasRoutes   = require('./routes/vendas');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req,res)=>res.json({status:'ok',message:'API rodando 🚀'}));

app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/vendas', vendasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`🚀 API rodando na porta ${PORT}`));
