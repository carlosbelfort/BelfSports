"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await api.get("/me");
        setUser(data);
      } catch (error) {
        console.error("Erro ao carregar perfil", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-white/70">
        Carregando perfil...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500">
        Não foi possível carregar os dados do usuário.
      </div>
    );
  }

  return (
    <main>
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <div className="max-w-xl mx-auto space-y-6">
        <Card title="Perfil do Usuário">
          <div className="space-y-4">
            {/* Nome */}
            <div>
              <span className="block text-sm text-white/60 mb-1">Nome</span>
              <div className="rounded-md bg-black/40 px-4 py-2 text-white">
                {user.name}
              </div>
            </div>

            {/* Email */}
            <div>
              <span className="block text-sm text-white/60 mb-1">E-mail</span>
              <div className="rounded-md bg-black/40 px-4 py-2 text-white">
                {user.email}
              </div>
            </div>

            {/* Role */}
            <div>
              <span className="block text-sm text-white/60 mb-1">Perfil</span>
              <div className="rounded-md bg-black/40 px-4 py-2 text-white">
                {user.role}
              </div>
            </div>

            {/* Status */}
            <div>
              <span className="block text-sm text-white/60 mb-1">Status</span>
              <div
                className={`rounded-md px-4 py-2 font-semibold ${
                  user.active
                    ? "bg-green-600/20 text-green-400"
                    : "bg-yellow-600/20 text-yellow-400"
                }`}
              >
                {user.active ? "Ativo" : "Inativo"}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
