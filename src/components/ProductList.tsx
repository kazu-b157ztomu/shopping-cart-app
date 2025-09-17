import React from 'react';
import { Link } from 'react-router-dom';
import { Product, products } from '../data/data';
import { useCart } from '../context/CartContext';

const ProductList: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🛍 商品一覧</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">現在、商品はありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-4 text-gray-700">{product.name}</h3>
              <p className="text-gray-600 mt-2">価格: <span className="font-bold">¥{product.price}</span></p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  詳細 →
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  🛒 追加
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
