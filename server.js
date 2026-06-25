require('dotenv').config();
const path = require('path');
const express = require('express');

const { initDatabase } = require('./models');
const authRoutes = require('./routes/auth');
const potionRoutes = require('./routes/potions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/potions', potionRoutes);

// Inicializa o banco em memória (cria tabelas + seed) antes de aceitar conexões.
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`web-potions rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao iniciar o banco de dados:', err);
    process.exit(1);
  });
