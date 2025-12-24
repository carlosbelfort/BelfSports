/*'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin(e: any) {
    e.preventDefault();
    setErro('');

    try {
      const res = await api.post('/login', { email, senha });

      document.cookie = `auth=${res.data.token}`;
      router.push('/dashboard');
    } catch {
      setErro('Credenciais inválidas');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card>
        <h1 className="mb-4 text-center text-2xl font-bold text-primary">
          BelfSports
        </h1>

        {erro && <p className="mb-3 text-center text-red-500">{erro}</p>}

        <form onSubmit={handleLogin} className="space-y-3">
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e: any) => setSenha(e.target.value)}
          />
          <Button>Entrar</Button>
        </form>
      </Card>
    </main>
  );
}*/

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const response = await api('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      router.push('/dashboard')
    } else {
      setError('Email ou senha inválidos')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-96 p-6 border rounded"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
