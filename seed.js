const Potion = require('./models/potion');

// Poções de exemplo inseridas no boot (o banco é :memory:, então some a cada
// restart). Substitua/edite à vontade — você também pode cadastrar pela tela de
// administrador.
const examplePotions = [
  {
    name: 'Poção Blue Sky',
    description:
      'Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.',
    price: 300,
    image: 'https://i.ibb.co/ZzS7xb2/rsz-sky.png',
  },
  {
    name: 'Poção do Perfume Misterioso',
    description:
      ' Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.',
    price: 200,
    image: 'https://i.ibb.co/pyhZJXf/rsz-lilas.png',
  },
  {
    name: 'Poção de Pinus',
    description:
      'Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.',
    price: 3000,
    image: 'https://i.ibb.co/DkzdL1q/rsz-pinus.png',
  },
  {
    name: 'Poção da Beleza Eterna',
    description:
      'Veneno que mata rápido',
    price: 100,
    image: 'https://i.ibb.co/9p872NK/rsz-1beleza.png',
  },
  {
    name: 'Poção do Arco Íro',
    description:
      'Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.',
    price: 120,
    image: 'https://i.ibb.co/PrC09MP/rsz-2unicornio.png',
  },
  {
    name: 'Caldeirão das Verdades Secretas',
    description:
      'As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.',
    price: 150,
    image: 'https://i.ibb.co/s9Lyvj8/rsz-verdades.png',
  },
];

async function seed() {
  await Potion.bulkCreate(examplePotions);
}

module.exports = seed;
