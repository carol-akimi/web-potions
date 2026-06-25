const express = require('express');
const Potion = require('../models/potion');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/potions — público: lista todas as poções (seção Produtos e admin).
router.get('/', async (req, res) => {
  const potions = await Potion.findAll({ order: [['createdAt', 'DESC']] });
  res.json(potions);
});

// POST /api/potions — protegido: cadastra uma poção.
router.post('/', auth, async (req, res) => {
  const { name, description, price, image } = req.body || {};

  if (!name || !description || price == null || !image) {
    return res
      .status(400)
      .json({ error: 'Campos obrigatórios: name, description, price, image.' });
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: 'Preço inválido.' });
  }

  const potion = await Potion.create({
    name,
    description,
    price: numericPrice,
    image,
  });
  res.status(201).json(potion);
});

// DELETE /api/potions/:id — protegido: remove uma poção.
router.delete('/:id', auth, async (req, res) => {
  const deleted = await Potion.destroy({ where: { id: req.params.id } });

  if (!deleted) {
    return res.status(404).json({ error: 'Poção não encontrada.' });
  }

  res.status(204).end();
});

module.exports = router;
