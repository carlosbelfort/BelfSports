"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { AdminCard } from "@/components/AdminCard";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <DashboardLayout>
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
        <AdminCard title="Moderação" href="/dashboard/admin/moderation" />        
        <AdminCard title="Spots" href="/dashboard/admin/spots" />
        <AdminCard title="Usuários" href="/dashboard/admin/users" />
        
      </div>
    </DashboardLayout>
  );
}
