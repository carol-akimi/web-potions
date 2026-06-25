const sequelize = require('../config/database');
const Potion = require('./potion');
const seed = require('../seed');

// Cria as tabelas no banco em memória e popula com as poções de exemplo.
async function initDatabase() {
  await sequelize.sync({ force: true });
  await seed();
}

module.exports = { sequelize, Potion, initDatabase };
