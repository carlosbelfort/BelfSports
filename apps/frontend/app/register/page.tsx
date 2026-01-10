"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      setLoading(false);
      return;
    }

    alert("Cadastro realizado! Aguarde aprovação.");
    router.push("/login");
  }

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Criar Conta
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            className=" input bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600"
            required
          />

          <input
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600"
            required
          />

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <Button variant="success"
            disabled={loading}
            
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form> <br />
        <Button variant="gray">
          <a href="/">Voltar</a>
        </Button>
      </div>
    </div>
  );
}