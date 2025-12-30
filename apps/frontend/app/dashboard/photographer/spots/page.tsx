"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Spot = {
  id: string;
  imageUrl: string;
  status: string;
  event: { title: string };
};

export default function PhotographerSpotsPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {    
    api("/photographer/spots").then(setSpots);
  }, []);

  async function handleUpload() {
    await api("/spots", {
      method: "POST",
      body: JSON.stringify({ imageUrl, eventId }),
    });

    setImageUrl("");
    api("/photographer/spots").then(setSpots);
  }

  return (
    <div>
      <h1 className="text-2xl mb-6">Minhas Fotos</h1>

      <select onChange={(e) => setEventId(e.target.value)}>
        <option value="">Selecione um evento</option>
        {events.map((event: any) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>

      <input
        placeholder="URL da imagem"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={handleUpload}>Enviar Foto</button>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {spots.map((spot) => (
          <div key={spot.id} className="border p-2">
            <img src={spot.imageUrl} />
            <p>{spot.event.title}</p>
            <p>Status: <strong>{spot.status}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}