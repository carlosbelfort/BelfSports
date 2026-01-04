interface SpotCardProps {
  spot: {
    id: string;
    name: string;
    description?: string;
    status: string;
    event: {
      title: string;
      date: string;
    };
  };
}

export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <div className="border rounded p-4 bg-zinc-900">
      <h3 className="text-lg font-semibold">{spot.name}</h3>

      {spot.description && (
        <p className="text-sm text-zinc-400">{spot.description}</p>
      )}

      <p className="text-sm mt-2">
        <strong>Evento:</strong> {spot.event.title}
      </p>

      <p className="text-xs text-zinc-400">
        Status: {spot.status}
      </p>
    </div>
  );
}