import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password); // ← UserContext の login を呼ぶだけ 
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
    // try {
    //   const res = await fetch("http://localhost:4000/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (!res.ok) {
    //     const data = await res.json();
    //     setError(data.message || "ログインに失敗しました");
    //     return;
    //   }

    //   const data = await res.json();
    //   localStorage.setItem("token", data.token);

    //   navigate("/");
    // } catch {
    //   setError("サーバーに接続できませんでした");
    // }
    // };
  };

  return (
    <div style={styles.container}>
      <h2>ログイン</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          ログイン
        </button>
      </form>

      <p>
        アカウントがありませんか？ <a href="/register" style={styles.link}>新規登録はこちら</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};
