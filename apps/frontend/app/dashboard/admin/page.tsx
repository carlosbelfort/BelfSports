"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { AdminCard } from '@/components/AdminCard'
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
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod in
        dolorem delectus alias eaque, eos sit mollitia quisquam culpa ipsa,
        dolore consequuntur suscipit doloremque inventore dolorum quae aut,
        repellat temporibus.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard title="Usuários" href="/dashboard/admin/users" />
        <AdminCard title="Eventos" href="/dashboard/admin/events" />
        <AdminCard title="Spots" href="/dashboard/admin/spots" />
        <AdminCard title="Moderação" href="/dashboard/admin/moderation" />
      </div>
    </DashboardLayout>
  );
}
