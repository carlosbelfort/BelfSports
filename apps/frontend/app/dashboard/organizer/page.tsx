'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { api } from "@/lib/api";
import DashboardLayout from '@/components/DashboardLayout'

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  status?: string;
};


export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    if (!loading && user?.role !== 'ORGANIZER') {
      router.push('/dashboard')
    }
  }, [user, loading, router])

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

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }


  return (
    <DashboardLayout>
    <main className="p-6">
      <h1 className="text-2xl mb-6">Meus Eventos</h1>
        {/* 🔹 LISTAGEM */}
        {events.length === 0 ? (
          <p className="text-zinc-400">Nenhum evento criado ainda.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="mb-3 border-b border-zinc-800 pb-2">
                <strong>{event.title}</strong> —{" "}
                {new Date(event.date).toLocaleDateString()}
                {event.location} - {""}
                {event.status && (
                  <span className="ml-2 text-sm text-zinc-400">
                    ({event.status})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
    </main>
    </DashboardLayout>
    
  );
}

