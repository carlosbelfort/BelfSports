"use client";

import { AdminCard } from "@/components/AdminCard";
import { main } from "framer-motion/client";

export default function AdminDashboard() {
  return (
    <main>
      <div className="bg-black/80 backdrop-blur shadow-lg rounded-xl border border-zinc-800 p-3 mb-6">
        <h1 className="text-2xl">Painel Administrativo</h1>
        <hr className="mb-6 my-2 border-muted" />
        <p className="text-left pb-6">
          <strong>
            Este painel permite ao administrador controlar e organizar todos os
            recursos da plataforma de forma centralizada. Aqui é possível criar
            e gerenciar eventos, administrar usuários, moderar spots e revisar
            fotos, garantindo a qualidade, a segurança e o bom funcionamento de
            toda a aplicação.
          </strong>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard title="Eventos" href="/dashboard/admin/events" />
        <AdminCard title="Criar Eventos" href="/dashboard/admin/createEvent" />
        <AdminCard title="Spots" href="/dashboard/admin/spots" />
        <AdminCard title="Criar Spots" href="/dashboard/admin/createSpot" />
        <AdminCard title="Uploads" href="/dashboard/upload" />
        <AdminCard title="Moderação de Fotos" href="/dashboard/moderation" />
        <AdminCard title="Usuários" href="/dashboard/admin/users" />
        <AdminCard title="Galeria" href="../gallery" />
        <AdminCard title="Perfil" href="./profile" />
      </div>
    </main>
  );
}
