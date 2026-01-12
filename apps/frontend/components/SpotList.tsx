"use client";
import { Spot } from "@/types/spot";
import SpotCard from "./SpotCard";

interface SpotListProps {
  spots: Spot[];
  role?: "ADMIN" | "ORGANIZER" | "PHOTOGRAPHER" | "USER";

  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function SpotList({
  spots,
  role = "USER",
  onApprove,
  onReject,
  onDelete,
}: SpotListProps) {
  if (!spots.length) {
    return <p className="text-zinc-400">Nenhum spot encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {spots.map((spot) => (
        <SpotCard
          key={spot.id}
          spot={spot}
          role={role}
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}