"use client";

import { AdminCard } from "@/components/AdminCard";

export default function AdminDashboard() {  

  return (
    <div>
      <h1 className="text-2xl mb-6">Painel Administrativo</h1>
      <p className="text-left pb-6"><strong>
        Este painel permite ao administrador controlar e organizar todos os
        recursos da plataforma de forma centralizada. Aqui é possível criar e
        gerenciar eventos, administrar usuários, moderar spots e revisar fotos,
        garantindo a qualidade, a segurança e o bom funcionamento de toda a
        aplicação.
      </strong></p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard title="Eventos" href="/dashboard/admin/events" />  
        <AdminCard title="Criar Eventos" href="/dashboard/admin/createEvent" />             
        <AdminCard title="Spots" href="/dashboard/admin/spots" />
        <AdminCard title="Criar Spots" href="/dashboard/admin/createSpot" />
        <AdminCard title="Uploads" href="/dashboard/upload" />
        <AdminCard title="Moderação de Fotos" href="/dashboard/admin/moderation" />
        <AdminCard title="Usuários" href="/dashboard/admin/users" />
        
      </div>

       </div>
    
  );
}
