/*"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Event = {
  id: string;
  title: string;
  date: string;
  spots: any[];
};

export default function PhotographerEventsPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  async function loadEvents() {
    const response = await api("/photographer/events");
    setEvents(response);
  }

  async function handleCreate() {
    await api("/photographer/events", {
      method: "POST",
      body: JSON.stringify({ title, date }),
    });

    setTitle("");
    setDate("");
    loadEvents();
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-6">Meus Eventos</h1>

      <div className="mb-6">
        <input
          placeholder="Título do evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleCreate}>Criar Evento</button>
      </div>

      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            <strong>{event.title}</strong> —{" "}
            {new Date(event.date).toLocaleDateString()}  
            ({event.spots.length} fotos)
          </li>
        ))}
      </ul>
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
  status?: string;
};

export default function PhotographerEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  async function loadEvents() {
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
  }

  async function handleCreateEvent() {
    if (!title || !date) {
      alert("Preencha título e data");
      return;
    }

    try {
      await api("/events", {
        method: "POST",
        body: JSON.stringify({
          title,
          date,
        }),
      });

      alert("Evento criado com sucesso!");

      setTitle("");
      setDate("");

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
    <div>
      <h1 className="text-2xl mb-6">Meus Eventos</h1>

      {/* 🔹 FORMULÁRIO */}
      <div className="mb-8 border border-zinc-800 p-4 rounded">
        <h2 className="text-lg mb-4">Criar novo evento</h2>

        <input
          type="text"
          placeholder="Título do evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

      {/* 🔹 LISTAGEM */}
      {events.length === 0 ? (
        <p className="text-zinc-400">
          Nenhum evento criado ainda.
        </p>
      ) : (
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className="mb-3 border-b border-zinc-800 pb-2"
            >
              <strong>{event.title}</strong> —{" "}
              {new Date(event.date).toLocaleDateString()}
              {event.status && (
                <span className="ml-2 text-sm text-zinc-400">
                  ({event.status})
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
