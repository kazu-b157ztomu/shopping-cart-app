import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import { CartProvider, useCart } from './context/CartContext';
import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import { UserProvider, useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";


function AppContent() {
  const { cart, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
  const { user, isLoggedIn, logout } = useUser();

  const [query, setQuery] = useState("");

  return (
    <Router>
      <div className="p-6 max-w-5xl mx-auto">
        <nav className="flex flex-wrap items-center justify-between gap-4 mb-6 text-lg font-medium">

          {/* 左側 */}
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-600 hover:underline">🏠 ホーム</Link>
            <input type="text" placeholder="商品を検索" value={query} onChange={(e) => setQuery(e.target.value)}
              className="border px-3 py-1 rounded"
            />
          </div>

          {/* 右側 */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700">🛒 カート: {itemCount}点（¥{total}）</span>
            <Link to="/cart" className="text-blue-600 hover:underline">🛍 カートへ</Link>
            <Link to="/checkout" className="text-blue-600 hover:underline">🧾 チェックアウト</Link>

            {/* ログイン状態によって表示を切り替え */}
            {isLoggedIn ? (
              <>
                <span className="text-gray-700">👤 {user?.email}</span>
                <button onClick={logout} className="text-red-600 hover:underline" >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-600 hover:underline">ログイン</Link>
                <Link to="/register" className="text-blue-600 hover:underline">新規登録</Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProductList query={query} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={
            <ProtectedRoute>
            <Cart cart={cart} total={total} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
            </ProtectedRoute>
          } />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} total={total} clearCart={clearCart} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>

  );
}

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  );
}
