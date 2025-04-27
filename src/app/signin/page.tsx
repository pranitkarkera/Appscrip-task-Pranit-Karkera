"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signin.module.css";

interface User {
  id: number;
  username: string;
  email: string;
}

export default function SigninPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Username or password is incorrect");
        return;
      }

      const data = await response.json();
      const token = data.token;

      const usersRes = await fetch("https://fakestoreapi.com/users");
      const users: User[] = await usersRes.json();
      const foundUser = users.find((u: User) => u.username === username);

      if (foundUser) {
        const userId = foundUser.id.toString();

        // Store token and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        router.push("/"); // Redirect after login
      } else {
        setError("User not found after login.");
      }
    } catch {
      setError("An unexpected error occurred.");
    }
  };

  const handleGuestLogin = () => {
    setUsername("johnd");
    setPassword("m38rmF$");
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button
          type="submit"
          className={styles.button}
          disabled={!username || !password}
        >
          Sign In
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <button
          className={styles.button}
          type="button"
          onClick={handleGuestLogin}
          style={{ backgroundColor: "#555" }}
        >
          Guest Login
        </button>
      </div>
    </div>
  );
}
