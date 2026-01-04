"use client";
import SpotCard from "./SpotCard";

export default function SpotList({ spots }: { spots: any[] }) {
  if (!spots.length) {
    return <p className="text-zinc-400">Nenhum spot encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}
