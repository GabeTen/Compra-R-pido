import { IMAGES } from './images';

const IMG = 'https://comprarapidotestecomprarapidocomprar.lovable.app/assets/';

export const CATEGORIES = ['Eletrônicos', 'Casa', 'Moda', 'Livros', 'Esporte'];

const BASE_PRODUCTS = [
  { id: 1, image: IMG + 'fone-DHDZoO2a.jpg', name: 'Fone Bluetooth Pro', category: 'Eletrônicos', seller: 'TechLoja', price: 249.9, rating: 4.7, tint: '#E3EEF9', description: 'Fone over-ear com cancelamento de ruído e até 30 horas de bateria.' },
  { id: 2, image: IMG + 'smartwatch-CzmQlmKW.jpg', name: 'Smartwatch Fit', category: 'Eletrônicos', seller: 'TechLoja', price: 399.9, rating: 4.5, tint: '#E6EAF2', description: 'Monitora batimentos, sono e treinos. Resistente à água.' },
  { id: 3, image: IMG + 'luminaria-D-Z2DGqT.jpg', name: 'Luminária de Mesa', category: 'Casa', seller: 'Casa & Cia', price: 89.9, rating: 4.8, tint: '#F6EBD6', description: 'Haste articulada e luz quente, ideal para leitura e escritório.' },
  { id: 4, image: IMG + 'panelas-C75qh3B0.jpg', name: 'Jogo de Panelas 5 peças', category: 'Casa', seller: 'Casa & Cia', price: 329.9, rating: 4.6, tint: '#F6E0D4', description: 'Antiaderente, com tampas de vidro e cabos que não esquentam.' },
  { id: 5, image: IMG + 'jaqueta-CcggOR2g.jpg', name: 'Jaqueta Jeans', category: 'Moda', seller: 'Moda Viva', price: 189.9, rating: 4.4, tint: '#DCE8F5', description: 'Jeans lavado, corte reto e bolsos frontais.' },
  { id: 6, image: IMG + 'tenis-CINskIVf.jpg', name: 'Tênis Branco Casual', category: 'Moda', seller: 'Moda Viva', price: 219.9, rating: 4.6, tint: '#F1ECE4', description: 'Solado de borracha e cabedal macio para o dia a dia.' },
  { id: 7, name: 'Livro: Design do Dia a Dia', category: 'Livros', seller: 'Sebo Central', price: 69.9, rating: 4.9, tint: '#DDE6F3', description: 'Exemplar em ótimo estado sobre como objetos comuns são projetados.' },
  { id: 8, name: 'Carregador Portátil 10.000 mAh', category: 'Eletrônicos', seller: 'TechLoja', price: 129.9, rating: 4.3, tint: '#E3EEF9', description: 'Duas saídas USB e carregamento rápido.' },
  { id: 9, name: 'Jogo de Toalhas', category: 'Casa', seller: 'Casa & Cia', price: 79.9, rating: 4.5, tint: '#F6EBD6', description: 'Algodão macio, jogo de banho e rosto na cor bege, com barra bordada.' },
  { id: 10, name: 'Camiseta Básica', category: 'Moda', seller: 'Moda Viva', price: 59.9, rating: 4.2, tint: '#E6EAF2', description: 'Camiseta branca de gola careca em malha 100% algodão, disponível em vários tamanhos.' },
  { id: 11, name: 'Livro: Receitas de Domingo', category: 'Livros', seller: 'Sebo Central', price: 54.9, rating: 4.6, tint: '#E1EEDF', description: 'Receitas caseiras para cozinhar com calma no fim de semana.' },
  { id: 12, name: 'Tapete de Yoga', category: 'Esporte', seller: 'Esporte+', price: 89.9, rating: 4.5, tint: '#E1EEDF', description: 'Antiderrapante, 6 mm de espessura e alça para transporte.' },
  { id: 13, name: 'Bola de Vôlei', category: 'Esporte', seller: 'Esporte+', price: 79.9, rating: 4.4, tint: '#F6EBD6', description: 'Costura reforçada, própria para quadra e areia.' },
  { id: 14, name: 'Caixa de Som Mini', category: 'Eletrônicos', seller: 'TechLoja', price: 159.9, rating: 4.6, tint: '#E3EEF9', description: 'Bluetooth, à prova de respingos e 12 horas de música.' },
  { id: 15, name: 'Garrafa Térmica 1L', category: 'Esporte', seller: 'Esporte+', price: 99.9, rating: 4.8, tint: '#DCE8F5', description: 'Mantém gelado por 24 horas e quente por 12.' },
  { id: 16, name: 'Halteres 5 kg (par)', category: 'Esporte', seller: 'Esporte+', price: 119.9, rating: 4.3, tint: '#E6EAF2', description: 'Ferro fundido com formato hexagonal que não rola, ideal para treinar em casa.' },
  { id: 17, name: 'Mochila Casual', category: 'Moda', seller: 'Moda Viva', price: 179.9, rating: 4.5, tint: '#E3EEF9', description: 'Mochila de lona azul-marinho com detalhes em couro sintético, bolso frontal com zíper e compartimento principal amplo.' },
];

export const PRODUCTS = BASE_PRODUCTS.map((p) => ({ ...p, image: IMAGES[p.id] ?? p.image })).filter((p) => p.image);

export const SELLERS = [
  { id: 's1', name: 'TechLoja', category: 'Eletrônicos', dLat: 0.012, dLng: 0.008 },
  { id: 's2', name: 'Casa & Cia', category: 'Casa', dLat: -0.02, dLng: 0.015 },
  { id: 's3', name: 'Sebo Central', category: 'Livros', dLat: 0.004, dLng: -0.006 },
  { id: 's4', name: 'Esporte+', category: 'Esporte', dLat: -0.03, dLng: -0.022 },
  { id: 's5', name: 'Moda Viva', category: 'Moda', dLat: 0.045, dLng: -0.03 },
];
