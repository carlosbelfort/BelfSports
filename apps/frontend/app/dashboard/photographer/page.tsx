"use client";

import { AdminCard } from "@/components/AdminCard";

export default function PhotographerDashboard() {
  return (
    <main>
      <div className="bg-black/80 backdrop-blur shadow-lg rounded-xl border border-zinc-800 p-3 mb-6">
        <h1 className="text-2xl">Painel do Fotógrafo</h1>
        <hr className="mb-6 my-2 border-muted" />
        <p className="text-left pb-6">
          <strong>
            Este painel permite ao fotógrafo organizar os recursos da plataforma
            de forma centralizada. Aqui é possível listar spots disponiveis,
            Listar uploads realizados, fazer upload de fotos em spots.
            Garantindo a qualidade, a segurança e o bom funcionamento de toda a
            aplicação.
          </strong>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard title="Spots" href="/dashboard/photographer/spots" />
        <AdminCard title="Uploads de fotos" href="/dashboard/upload" />
        <AdminCard title="Galeria" href="../gallery" />
        <AdminCard title="Perfil" href="./profile" />
      </div>
    </main>
  );
}
