"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import DashboardLayout from "@/components/DashboardLayout";
import { AdminCard } from "@/components/AdminCard";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  status?: string;
};

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user || user.role !== "ORGANIZER") {
      router.push("/login");
    }
  }, [user, loading, router]);

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
    }
  }

  useEffect(() => {
    if (!loading && user?.role === "ORGANIZER") {
      loadEvents();
    }
  }, [loading, user]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="p-6">Carregando...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="p-6">
        <h1 className="text-2xl mb-6">Painel do Organizador</h1>
        <p className="text-left pb-6">
          <strong>
            Este painel permite ao organizador controlar e organizar os recursos
            da plataforma de forma centralizada. Aqui é possível listar e criar
            eventos, moderar spots de eventos aprovados, garantindo a qualidade,
            a segurança e o bom funcionamento de toda a aplicação.
          </strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminCard
            title="Lista de Eventos"
            href="/dashboard/organizer/listevents"
          />
          <AdminCard title="Criar evento" href="/dashboard/organizer/events" />

          <AdminCard
            title="Criar Spot"
            href="/dashboard/organizer/createSpot"
          />
          <AdminCard title="Lista de Spots" href="/dashboard/organizer/spots" />
        </div>
      </main>
    </DashboardLayout>
  );
}
