"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Card from "@/components/Card";
import { api } from "@/lib/api";

interface Event {
  id: string;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function CreateSpotPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventId, setEventId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      const data = await api("/events");
      setEvents(data.filter((ev: Event) => ev.status === "APPROVED"));
    }
    loadEvents();
  }, []);

  async function handleCreateSpot() {
    if (!eventId || !name) {
      setMessage("Preencha o nome e selecione um evento");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await api.post("/spots", {
        eventId,
        name,
        description: description || undefined,
      });

      setMessage("Spot criado com sucesso!");
      setEventId("");
      setName("");
      setDescription("");
    } catch {
      setMessage("Erro ao criar spot");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Card title="Criar Spot">
        <div className="flex flex-col gap-4">
          <input
            placeholder="Nome do Spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-2 rounded"
          />

          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-2 rounded"
          />

          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 p-2 rounded"
          >
            <option value="">Selecione um evento aprovado</option>
            {events.map((event) => (
              <option key={event.id} value={event.id} className="text-black">
                {event.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateSpot}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition px-4 py-2 rounded"
          >
            {loading ? "Criando..." : "Criar Spot"}
          </button>

          {message && <p className="text-sm text-zinc-300">{message}</p>}
        </div>
      </Card>
    </DashboardLayout>
  );
}