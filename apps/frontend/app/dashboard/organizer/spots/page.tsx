"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SpotList from "@/components/SpotList";
import SpotForm from "@/components/SpotForm";
import DashboardLayout from "@/components/DashboardLayout";

export default function OrganizerSpotsPage() {
  const [spots, setSpots] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  async function loadSpots() {
    const data = await api("/spots/organizer");
    setSpots(Array.isArray(data) ? data : []);
  }

  async function loadEvents() {
    const data = await api("/events");
    setEvents(Array.isArray(data) ? data : []);
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este spot?")) return;
    await api(`/spots/${id}`, { method: "DELETE" });
    loadSpots();
  }

  useEffect(() => {
    loadSpots();
    loadEvents();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl mb-6">Meus Spots</h1>

        <select
          onChange={(e) => setSelectedEvent(e.target.value)}
          value={selectedEvent}
        >
          <option value="" className="text-black">Selecione um evento</option>
          {events
            .filter((ev) => ev.status === "APPROVED")
            .map((ev) => (
              <option className="text-black" key={ev.id} value={ev.id}>
                {ev.title}
              </option>
            ))}
        </select>

        {selectedEvent && (
          <SpotForm eventId={selectedEvent} onSuccess={loadSpots} />
        )}

        <SpotList spots={spots} onDelete={handleDelete} />
      </div>
    </DashboardLayout>
  );
}