"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Card from "@/components/Card";

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateEvent() {
    setError("");

    if (!title || !date || !location) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/events", {
        title,
        date,
        location,
      });

      alert(
        "Evento criado com sucesso!\nEle ficará pendente até aprovação do administrador."
      );

      // limpa formulário
      setTitle("");
      setDate("");
      setLocation("");

      // redireciona para lista de eventos do usuário
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Erro ao criar evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
   <main>
      <Card>
        <h1 className="text-2xl mb-6">Criar novo evento</h1>

        <div className="space-y-4 max-w-xl">
          <input
            type="text"
            placeholder="Título do evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded"
          />

          <input
            type="text"
            placeholder="Localização do evento"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 bg-zinc-900 border border-zinc-800 rounded"
          />

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            onClick={handleCreateEvent}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded font-semibold disabled:opacity-60"
          >
            {loading ? "Criando..." : "Criar Evento"}
          </button>
        </div>
      </Card>
    </main>
  );
}