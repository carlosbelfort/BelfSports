"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  role: "USER" | "ORGANIZER" | "ADMIN" | "PHOTOGRAPHER";
  active: boolean;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadUsers() {
    const response = await api.get("/admin/users");

    setUsers(Array.isArray(response) ? response : []);
    setLoading(false);
  }

  async function changeRole(id: string, role: string) {
    await api.patch(`/admin/users/${id}/role`, { role });
    loadUsers();
  }

  async function toggleStatus(id: string, active: boolean) {
    await api.patch(`/admin/users/${id}/status`, { active: !active });
    loadUsers();
  }

  async function removeUser(id: string) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
    await api.delete(`/admin/users/${id}`);
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <p>Carregando usuários...</p>;

  return (
    <div>
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <h1 className="text-2xl mb-6">Gerenciar Usuários</h1>

      <table className="w-full text-sm border border-zinc-800">
        <thead className="bg-zinc-900 text-center">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Ações</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-zinc-400">
                Nenhum usuário encontrado
              </td>
            </tr>
          )}

          {users.map((user) => (
            <tr key={user.id} className="border-t border-zinc-800">
              <td className="p-2 text-center">{user.email}</td>

              <td className="p-2 text-center">
                {user.active ? (
                  <span className="text-green-500">Ativo</span>
                ) : (
                  <span className="text-yellow-400">Pendente</span>
                )}
              </td>

              <td className="p-2 flex gap-2 justify-center">
                <Button
                  variant="caution"
                  onClick={() => toggleStatus(user.id, user.active)}
                >
                  {user.active ? "Bloquear" : "Ativar"}
                </Button>

                <Button variant="danger" onClick={() => removeUser(user.id)}>
                  Excluir
                </Button>
              </td>
              <td className="text-center">
                <select
                  value={user.role}
                  onChange={(e) => changeRole(user.id, e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 p-1 rounded"
                >
                  <option value="USER">USER</option>
                  <option value="ORGANIZER">ORGANIZER</option>
                  <option value="PHOTOGRAPHER">PHOTOGRAPHER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
