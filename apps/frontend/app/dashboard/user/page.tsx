"use client";

import { AdminCard } from "@/components/AdminCard";

export default function UserDashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl mb-6">Minha Área</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminCard title="Galeria" href="../gallery" />
        <AdminCard title="Perfil" href="./profile" />
      </div>
    </main>
  );
}
