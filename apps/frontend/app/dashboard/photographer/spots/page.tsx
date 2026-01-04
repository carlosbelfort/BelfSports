"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SpotList from "@/components/SpotList";
import SpotUpload from "@/components/SpotUpload";

export default function PhotographerSpotsPage() {
  const [spots, setSpots] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  async function loadSpots() {
    const data = await api("/spots");
    setSpots(data);
  }

  async function loadEvents() {
    const data = await api("/events");
    setEvents(data);
  }

  useEffect(() => {
    loadSpots();
    loadEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-6">Minhas Fotos</h1>

      <select onChange={(e) => setSelectedEvent(e.target.value)} value={selectedEvent}>
        <option value="">Selecione um evento</option>
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>{ev.title}</option>
        ))}
      </select>

      {selectedEvent && <SpotUpload eventId={selectedEvent} onUpload={loadSpots} />}

      <SpotList spots={spots} />
    </div>
  );
}