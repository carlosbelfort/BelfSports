"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Credenciais inválidas");
      }

      const data = await response.json();

      //Estado global (não guarda token duplicado)
      login({
        id: data.user.id,
        role: data.user.role,
        token: data.token,
      });

      // depois de receber `data`

      document.cookie = `token=${data.token}; path=/; max-age=86400`;
      document.cookie = `role=${data.user.role}; path=/; max-age=86400`;

      router.push(`/dashboard/${data.user.role.toLowerCase()}`);
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
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 transition font-semibold py-3 rounded mt-2 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Não tem conta?{" "}
          <a href="/register" className="text-red-500 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
