export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  
};

export const products = [
  {
    id: 1,
    name: 'Tシャツ',
    price: 1500,
    description: '柔らかくて着心地の良いコットン素材のTシャツです。',
    image: 'https://via.placeholder.com/200x200.png?text=Tシャツ',
    
  },
  {
    id: 2,
    name: 'ジーンズ',
    price: 4500,
    description: 'スタイリッシュで丈夫なデニムジーンズ。',
    image: 'https://via.placeholder.com/200x200.png?text=ジーンズ',
    
  },
  {
    id: 3,
    name: 'スニーカー',
    price: 8000,
    description: '軽量で快適な履き心地のスニーカー。',
    image: 'https://via.placeholder.com/200x200.png?text=スニーカー',
    
  },
];
