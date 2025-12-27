/*"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  api.get('/admin/users').then(res => {
    setUsers(res)
    setLoading(false)
  })
}, []);
  return (
    <div>
      <h1 className="text-2xl mb-6">Gerenciar Usuários</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button>Promover</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Event = {
  id: string;
  title: string;
  date: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    try {
      const response = await api.get("/admin/events");

      if (Array.isArray(response)) {
        setEvents(response);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar eventos");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir este evento?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/events/${id}`);
      setEvents((prev) =>
        prev.filter((event) => event.id !== id)
      );
    } catch (err) {
      alert("Erro ao excluir evento");
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-6">Gerenciar Eventos</h1>

      {events.length === 0 ? (
        <p className="text-zinc-400">
          Nenhum evento cadastrado.
        </p>
      ) : (
        <table className="w-full text-sm border border-zinc-800">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-2 text-left">Título</th>
              <th className="p-2 text-left">Data</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-t border-zinc-800"
              >
                <td className="p-2">{event.title}</td>
                <td className="p-2">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

