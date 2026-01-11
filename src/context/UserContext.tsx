import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  id: number;
  email: string;
};

type UserContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // ① アプリ起動時にログイン状態を復元
  // -----------------------------
  useEffect(() => {
    //const storedToken = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:4000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("認証エラー");
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setToken(token);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  // -----------------------------
  // ② ログイン処理
  // -----------------------------
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "ログインに失敗しました");
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    setToken(data.token);

    const meRes = await fetch("http://localhost:4000/auth/me", {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    const meData: User = await meRes.json();
    setUser(meData);
  };

  // -----------------------------
  // ③ ログアウト処理
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
