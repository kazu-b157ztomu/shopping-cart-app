// // context/CartContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Product } from '../data/data';

// export type CartItem = Product & { quantity: number };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, delta: number) => void;
//   clearCart: () => void;
//   total: number;
//   itemCount: number;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (product: Product) => {
//     const existing = cart.find(item => item.id === product.id);
//     if (existing) {
//       setCart(cart.map(item =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id: number) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const updateQuantity = (id: number, delta: number) => {
//     setCart(cart.map(item =>
//       item.id === id
//         ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//         : item
//     ));
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser } from './UserContext'; // ← JWT を取得するため
import { Product } from '../data/data';

export type CartItem = {
  id: number;          // CartItem の ID（DB の ID）
  productId: number;   // 商品ID
  quantity: number;
  product: Product;    // Prisma の include で取得する
};

type CartContextType = {
  cart: CartItem[];
  loadCart: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, delta: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { token } = useUser();

  // -------------------------
  // カートをサーバーから取得
  // -------------------------
  const loadCart = async () => {
    if (!token) return;

    const res = await fetch("http://localhost:4000/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data);
  };

  // -------------------------
  // カートに追加
  // -------------------------
  const addToCart = async (productId: number) => {
    await fetch("http://localhost:4000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    await loadCart();
  };

  // -------------------------
  // カートから削除
  // -------------------------
  const removeFromCart = async (cartItemId: number) => {
    await fetch(`http://localhost:4000/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await loadCart();
  };

  // -------------------------
  // 数量変更
  // -------------------------
  const updateQuantity = async (cartItemId: number, delta: number) => {
    await fetch(`http://localhost:4000/cart/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cartItemId, delta }),
    });

    await loadCart();
  };

  // -------------------------
  // カートを空にする
  // -------------------------
  const clearCart = async () => {
    await fetch("http://localhost:4000/cart/clear", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await loadCart();
  };

  // -------------------------
  // ログインしたらカートを読み込む
  // -------------------------
  useEffect(() => {
    if (token) loadCart();
  }, [token]);

  // -------------------------
  // token が消えたらカートを空にする
  // -------------------------
  useEffect(() => {
    if (!token) {
      setCart([]);
    }
  }, [token]);


  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loadCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
