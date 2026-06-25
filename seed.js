const Potion = require('./models/potion');

// Poções de exemplo inseridas no boot (o banco é :memory:, então some a cada
// restart). Substitua/edite à vontade — você também pode cadastrar pela tela de
// administrador.
const examplePotions = [
  {
    name: 'Elixir da Vida Eterna',
    description:
      'Um destilado dourado que restaura o vigor e afasta os males do tempo. Use com moderação.',
    price: 149.9,
    image: 'https://images.unsplash.com/photo-1596424197152-be9c75df4d6a?w=600&q=80',
  },
  {
    name: 'Poção do Sono Profundo',
    description:
      'Vapores de lavanda e luar engarrafados. Garante uma noite de descanso sem pesadelos.',
    price: 59.5,
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=600&q=80',
  },
  {
    name: 'Tônico da Coragem',
    description:
      'Fervido com raiz de dragão e pimenta-fantasma. Aquece o peito e dissolve o medo.',
    price: 89.0,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
  },
  {
    name: 'Néctar da Invisibilidade',
    description:
      'Translúcido como orvalho. Some da vista por alguns minutos — efeito varia com a lua.',
    price: 210.0,
    image: 'https://images.unsplash.com/photo-1578652520385-c05f6f3b1f3c?w=600&q=80',
  },
];

async function seed() {
  await Potion.bulkCreate(examplePotions);
}

module.exports = seed;
