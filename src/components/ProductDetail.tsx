import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/data';
import { useCart } from '../context/CartContext';

type Params = {
  id: string;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();

  const productId = Number(id);
  if (!id || isNaN(productId)) {
    return <p className="text-red-500 text-center mt-10">無効な商品IDです</p>;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return <p className="text-red-500 text-center mt-10">商品が見つかりません</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{product.name}</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-64 h-64 object-cover rounded shadow"
        />

        <div className="flex-1">
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mb-6">価格: ¥{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            🛒 カートに追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
