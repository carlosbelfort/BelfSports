"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function PhotographerSpotsPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api("/events").then(setEvents);
  }, []);

  async function handleSubmit() {
    await api("/spots", {
      method: "POST",
      body: JSON.stringify({
        imageUrl,
        eventId,
      }),
    });

    alert("Spot enviado para moderação!");
    setImageUrl("");
  }

  return (
    <div>
      <h1 className="text-2xl mb-6">Enviar Spot</h1>

      <select
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      >
        <option value="">Selecione o evento</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>

      <input
        placeholder="URL da imagem"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="block my-4"
      />

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}