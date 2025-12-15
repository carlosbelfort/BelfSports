'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post('http://localhost:3333/login', {
        email,
        senha
      });

      if (response.data.success) {
        localStorage.setItem('auth', 'true');
        router.push('/dashboard');
      }
    } catch (err) {
      setErro('E-mail ou senha inválidos');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

        {erro && (
          <p className="mb-3 text-center text-sm text-red-600">
            {erro}
          </p>
        )}

        <input
          type="email"
          placeholder="E-mail"
          className="mb-3 w-full rounded border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="mb-4 w-full rounded border px-3 py-2"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="w-full rounded bg-blue-600 py-2 text-white">
          Entrar
        </button>
      </form>
    </main>
  );
}
