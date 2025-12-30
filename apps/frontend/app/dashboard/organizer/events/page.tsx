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
  status?: string;
};

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  /*async function loadEvents() {
    try {
      const res = await api("/events");

      if (Array.isArray(res)) {
        setEvents(res);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error(error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }*/

  async function loadEvents() {
    try {
      const res = await api("/events");

      setEvents(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error(error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateEvent() {
    if (!title || !date || !location) {
      alert("Preencha título, data e Localização");
      return;
    }

    try {
      await api("/events", {
        method: "POST",
        body: JSON.stringify({
          title,
          date,
          location,
        }),
      });

      alert("Evento criado com sucesso!\nAguarde aprovação do Administrador.");

      setTitle("");
      setDate("");
      setLocation("");

      loadEvents(); // 🔄 atualiza lista
    } catch (error) {
      alert("Erro ao criar evento");
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
        <Card>
          {/* 🔹 FORMULÁRIO */}
          <div className="mb-8 border border-zinc-800 p-4 rounded">
            <h1 className="text-2xl mb-6">Criar novo evento</h1>

            <input
              type="text"
              placeholder="Título do evento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block mb-3 w-full p-2 bg-zinc-900 border border-zinc-800 rounded"
            />

            <input
              type="text"
              placeholder="Localização do evento"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block mb-3 w-full p-2 bg-zinc-900 border border-zinc-800 rounded"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block mb-4 p-2 bg-zinc-900 border border-zinc-800 rounded"
            />

            <button
              onClick={handleCreateEvent}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Criar Evento
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
