"use client";

interface Spot {
  id: string;
  imageUrl: string;
  status: string;
  event: { title: string };
  user?: { name: string };
}

interface Props {
  spots: Spot[];
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function SpotList({ spots, onDelete, onApprove, onReject }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {spots.map((spot) => (
        <div key={spot.id} className="border p-2 rounded">
          <img src={spot.imageUrl} className="mb-2 rounded" />
          <p>Evento: {spot.event.title}</p>
          {spot.user && <p>Usuário: {spot.user.name}</p>}
          <p>Status: {spot.status}</p>

          <div className="flex gap-2 mt-2">
            {onApprove && <button onClick={() => onApprove(spot.id)} className="text-green-500">Aprovar</button>}
            {onReject && <button onClick={() => onReject(spot.id)} className="text-yellow-500">Rejeitar</button>}
            {onDelete && <button onClick={() => onDelete(spot.id)} className="text-red-500">Excluir</button>}
          </div>
        </div>
      ))}
    </div>
  );
}