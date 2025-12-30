"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SpotList from "@/components/SpotList";
import DashboardLayout from "@/components/DashboardLayout";

type Spot = {
  id: string;
  imageUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  event: { title: string };
  user: { name: string; email: string };
};

export default function AdminSpotsPage() {
  const [spots, setSpots] = useState<Spot[]>([]);

  async function loadSpots() {
    const response = await api("/spots");
    setSpots(response);
  }

  async function updateStatus(id: string, status: string) {
    await api(`/spots/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    loadSpots();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este spot?")) return;
    await api(`/spots/${id}`, { method: "DELETE" });
    loadSpots();
  }

  useEffect(() => {
    loadSpots();
  }, []);

  return (
    <DashboardLayout>
    <div>
      <h1 className="text-2xl mb-6">Moderação de Spots</h1>
      <SpotList
        spots={spots}
        onApprove={(id) => updateStatus(id, "APPROVED")}
        onReject={(id) => updateStatus(id, "REJECTED")}
        onDelete={handleDelete}
      />
    </div>
    </DashboardLayout>
  );
}