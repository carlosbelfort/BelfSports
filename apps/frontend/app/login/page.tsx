"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Envia credenciais para o backend
   * Recebe JWT e salva no localStorage
   */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `role=${data.user.role}; path=/`;

      // Salva token e role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);

      // Redireciona
      switch (data.user.role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;

        case "ORGANIZER":
          router.push("/dashboard/organizer");
          break;

        case "PHOTOGRAPHER":
          router.push("/dashboard/photographer");
          break;

        case "USER":
          router.push("/dashboard/user");
          break;

        default:
          router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-red-700 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Acesso ao BelfSports
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            className="bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <span className="text-sm text-red-500 text-center">{error}</span>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 transition font-semibold py-3 rounded mt-2 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
