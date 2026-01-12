"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";
import Card from "@/components/Card";

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
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    async function listEventsForSpot() {
      try {
        let data: Event[] = [];

        if (user.role === "ADMIN") {
          data = await api.get("/events");
        }

        if (user.role === "ORGANIZER") {
          data = await api.get("/organizer/events");
        }

        setEvents(data);
      } catch (err) {
        console.error("Erro ao buscar eventos", err);
        setEvents([]);
      }
    }

    listEventsForSpot();
  }, [user]);

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
    <main>
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <Card>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold mb-2">Criar Spot</h1>
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
            <option value="">Selecione um evento</option>
            {events.map((event) => (
              <option key={event.id} value={event.id} className="text-zinc-400">
                {event.title}
              </option>
            ))}
          </select>

          <Button onClick={handleCreateSpot} disabled={loading} variant="sky">
            {loading ? "Criando..." : "Criar Spot"}
          </Button>

          {message && <p className="text-sm text-zinc-300">{message}</p>}
        </div>
      </Card>
    </main>
  );
}
