"use client";

import { AdminCard } from "@/components/AdminCard";

export default function PhotographerDashboard() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Painel do Fotógrafo</h1>
      <p className="text-left pb-6">
        <strong>
          Este painel permite ao fotógrafo organizar os recursos da plataforma
          de forma centralizada. Aqui é possível listar spots disponiveis,
          Listar uploads realizados, fazer upload de fotos em spots. Garantindo
          a qualidade, a segurança e o bom funcionamento de toda a aplicação.
        </strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard title="Spots" href="/dashboard/photographer/spots" />
        <AdminCard title="Uploads de fotos" href="/dashboard/upload" />
        <AdminCard title="Galeria" href="../gallery" />
        <AdminCard title="Perfil" href="./profile" />
      </div>
    </div>
  );
}
