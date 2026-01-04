"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Card from "@/components/Card";

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "USER")) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <DashboardLayout>
      <h1 className="text-2xl mb-6">Minha Área</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Meus Eventos">
          <p>Gerencie os eventos que você está participando ou organizando.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
