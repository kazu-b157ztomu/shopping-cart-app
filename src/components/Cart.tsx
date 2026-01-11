import React from 'react';
import { CartItem } from '../context/CartContext';

type CartProps = {
  cart: CartItem[];
  total: number;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({ cart, total, updateQuantity, removeFromCart }) => {
  

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 カートの中身</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">カートは空です。</p>
      ) : (
        <ul className="space-y-6">
          {cart.map(item => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
            >
              <div className="flex-1">
                <span className="block text-lg font-semibold text-gray-700">
                  {item.product.name}
                </span>
                <span className="text-gray-600">
                  ¥{item.product.price} × {item.quantity}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  －
                </button>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ＋
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-xl font-bold mt-8 text-right text-gray-800">
        合計: ¥{total}
      </h3>
    </div>
  );
};

export default Cart;
