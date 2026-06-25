const { Sequelize } = require('sequelize');

// Banco SQLite em memória: os dados existem apenas enquanto o servidor roda.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

module.exports = sequelize;
