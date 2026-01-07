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
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMyEvents() {
    try {
      const data = await api.get("/events");
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMyEvents();
  }, []);

  if (loading) {
    return <p className="text-white">Carregando seus eventos...</p>;
  }

  return (
    <DashboardLayout>
      <Card>
        <h1 className="text-2xl mb-6">Meus Eventos</h1>

        {events.length === 0 && (
          <p className="text-zinc-400">
            Você ainda não cadastrou nenhum evento.
          </p>
        )}

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-zinc-800 p-4 rounded"
            >
              <p className="font-bold text-lg">{event.title}</p>

              <p className="text-sm text-zinc-400">
                {event.location} —{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p
                className={`text-sm mt-2 font-medium ${
                  event.status === "APPROVED"
                    ? "text-green-500"
                    : event.status === "PENDING"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Status: {event.status}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}