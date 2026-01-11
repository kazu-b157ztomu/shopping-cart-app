import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ReactElement } from "react";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isLoggedIn, loading } = useUser();

  // ログイン状態を確認中
  if (loading) {
    return <p>読み込み中...</p>;
  }

  // 未ログイン → /login に飛ばす
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ログイン済み → ページを表示
  return children;
}
