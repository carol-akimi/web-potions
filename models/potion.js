const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Poção: nome, descrição, preço e imagem (caminho local ou URL).
const Potion = sequelize.define('Potion', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Potion;
