"use client";

import { AdminCard } from "@/components/AdminCard";

export default function OrganizerDashboard() {
  return (
    <main>
      <div className="bg-black/80 backdrop-blur shadow-lg rounded-xl border border-zinc-800 p-3 mb-6">
        <h1 className="text-2xl">Painel do Organizador</h1>
        <hr className="mb-6 my-2 border-muted" />
        <p className="pb-6">
          <strong>
            Este painel permite ao organizador controlar e organizar os recursos
            da plataforma de forma centralizada.
          </strong>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard
          title="Lista de Eventos"
          href="/dashboard/organizer/listevents"
        />
        <AdminCard title="Criar Evento" href="/dashboard/organizer/events" />
        <AdminCard title="Criar Spot" href="/dashboard/organizer/createSpot" />
        <AdminCard title="Lista de Spots" href="/dashboard/organizer/spots" />
        <AdminCard title="Moderação de Fotos" href="/dashboard/moderation" />
        <AdminCard title="Galeria" href="../gallery" />
        <AdminCard title="Perfil" href="./profile" />
      </div>
    </main>
  );
}
