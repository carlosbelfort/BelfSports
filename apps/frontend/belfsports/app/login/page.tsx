'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        senha,
      });

      if (response.data.success) {
        localStorage.setItem('auth', 'true');
        router.push('/dashboard');
      }
    } catch {
      setErro('Credenciais inválidas');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">

      <Card className="w-full max-w-md bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-purple-400">
            BelfSports
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {erro && (
              <p className="text-sm text-red-500 text-center">{erro}</p>
            )}

            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
