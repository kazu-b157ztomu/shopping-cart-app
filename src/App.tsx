import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import { CartProvider, useCart } from './context/CartContext';

function AppContent() {
  const { cart, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();

  return (
    <Router>
      <div className="p-6 max-w-5xl mx-auto">
        <nav className="flex flex-wrap items-center justify-between gap-4 mb-6 text-lg font-medium">
          <Link to="/" className="text-blue-600 hover:underline">🏠 ホーム</Link>
          <span className="text-gray-700">🛒 カート: {itemCount}点（¥{total}）</span>
          <Link to="/cart" className="text-blue-600 hover:underline">🛍 カートへ</Link>
          <Link to="/checkout" className="text-blue-600 hover:underline">🧾 チェックアウト</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={
            <Cart cart={cart} total={total} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
          } />
          <Route path="/checkout" element={<Checkout cart={cart} total={total} clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>

  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
