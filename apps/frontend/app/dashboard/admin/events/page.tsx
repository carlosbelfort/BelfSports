"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import DashboardLayout from "@/components/DashboardLayout";

type Event = {
  id: string;
  title: string;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    try {
      const data = await api.get("/events/admin/events");

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error(err);
      setEvents([]);
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
      await api.delete(`/events/admin/events/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      alert("Erro ao excluir evento");
    }
  }

  async function handleApprove(id: string) {
    try {
      await api.patch(`/events/admin/events/${id}/approve`);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, status: "APPROVED" } : event
        )
      );
    } catch (err) {
      alert("Erro ao aprovar evento");
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl mb-6">Gerenciar Eventos</h1>

        {events.length === 0 ? (
          <p className="text-zinc-400">Nenhum evento cadastrado.</p>
        ) : (
          <table className="w-full text-sm border border-zinc-800">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-2 text-left">Título</th>
                <th className="p-2 text-center">Data</th>
                <th className="p-2 text-center">Ações</th>
                <th className="p-2 text-left">Situação</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-zinc-800">
                  <td className="p-2">{event.title}</td>
                  <td className="p-2 text-center">
                    {new Date(event.date).toLocaleDateString()}
                  </td>

                  <td className="p-2 text-center">
                    {event.status === "PENDING" && (
                      <button
                        onClick={() => handleApprove(event.id)}
                        className="text-green-500 hover:underline mr-4"
                      >
                        Aprovar
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                  <td className="p-2">
                    {event.status === "APPROVED" ? "Aprovado" : "Pendente"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
