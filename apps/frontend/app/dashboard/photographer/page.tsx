"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AdminCard } from "@/components/AdminCard";
import Link from "next/link";

export default function PhotographerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "PHOTOGRAPHER")) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl mb-6">Painel do Fotógrafo</h1>
        <p className="text-left pb-6">
          <strong>
            Este painel permite ao fotógrafo organizar os recursos da plataforma
            de forma centralizada. Aqui é possível listar spots disponiveis,
            Listar uploads realizados, fazer upload de fotos em spots.
            Garantindo a qualidade, a segurança e o bom funcionamento de toda a
            aplicação.
          </strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminCard title="Spots" href="/dashboard/photographer/spots" />
          <AdminCard
            title="Lista de uploads"
            href="/dashboard/photographer/listUploads"
          />
          <AdminCard
            title="Uploads de fotos"
            href="/dashboard/photographer/uploads"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
