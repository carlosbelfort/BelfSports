"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import DashboardLayout from "@/components/DashboardLayout";
import Card from "@/components/Card";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    try {
      const data = await api.get("/admin/events");
      setEvents(data || []);
    } catch (error) {
      console.error(error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      await api.patch(`/admin/events/${id}/approve`);
      loadEvents();
    } catch {
      alert("Erro ao aprovar evento");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja excluir este evento?")) return;

    try {
      await api.delete(`/admin/events/${id}`);
      loadEvents();
    } catch {
      alert("Erro ao excluir evento");
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) {
    return <p className="text-white">Carregando eventos...</p>;
  }

  return (
    <DashboardLayout>
      <Card>
        <h1 className="text-2xl mb-6">Moderação de Eventos</h1>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-zinc-800 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-zinc-400">
                  {event.location} —{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    event.status === "APPROVED"
                      ? "text-green-500"
                      : event.status === "PENDING"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {event.status}
                </p>
              </div>

              <div className="flex gap-2">
                {event.status === "PENDING" && (
                  <button
                    onClick={() => handleApprove(event.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Aprovar
                  </button>
                )}

                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}