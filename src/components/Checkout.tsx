import React, { useState } from 'react';
import { CartItem } from '../context/CartContext';

type FormData = {
  name: string;
  address: string;
  phone: string;
  card: string;
};

type CheckoutProps = {
  cart: CartItem[];
  total: number;
  clearCart: () => void;
};

const Checkout: React.FC<CheckoutProps> = ({ cart, total, clearCart }) => {
  const [form, setForm] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    card: '',
  });

  const [errors, setErrors] = useState<{ phone?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone: string): string | undefined => {
    const phoneRegex = /^0\d{1,4}-\d{1,4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return '電話番号の形式が正しくありません（例: 090-1234-5678）';
    }
    return undefined;
  };

  const handleSubmit = () => {
    const phoneError = validatePhone(form.phone);
    if (phoneError) {
      setErrors({ phone: phoneError });
      return;
    }

    clearCart();
    alert(`注文を確定しました！\n${form.name} 様、ありがとうございました。`);
    setErrors({});
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">🧾 お支払い手続き</h2>

      {/* カートの中身を表示 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">🛒 ご注文内容</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">カートは空です。</p>
        ) : (
          <ul className="space-y-2">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name} × {item.quantity}</span>
                <span>¥{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-right font-bold text-lg text-gray-800 mt-4">合計金額: ¥{total}</p>
      </div>

      {/* フォーム */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">名前：</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">住所：</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">電話番号：</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">クレジットカード番号：</label>
          <input
            type="text"
            name="card"
            value={form.card}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          ✅ 注文を確定する
        </button>
      </form>
    </div>
  );
};

export default Checkout;

