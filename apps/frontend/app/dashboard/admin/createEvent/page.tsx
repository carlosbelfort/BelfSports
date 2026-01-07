"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import DashboardLayout from "@/components/DashboardLayout";
import Card from "@/components/Card";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateEvent() {
    if (!title || !date || !location) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      await api.post("/events", {
        title,
        date,
        location,
      });

      alert("Evento criado com sucesso! Aguardando aprovação.");

      setTitle("");
      setDate("");
      setLocation("");
    } catch (error) {
      alert("Erro ao criar evento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Card>
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
          placeholder="Localização"
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
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar Evento"}
        </button>
      </Card>
    </DashboardLayout>
  );
}