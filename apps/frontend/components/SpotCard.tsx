import { Spot } from "@/types/spot";

interface SpotCardProps {
  spot: Spot;
  role: "ADMIN" | "ORGANIZER" | "PHOTOGRAPHER" | "USER";

  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function SpotCard({
  spot,
  role,
  onApprove,
  onReject,
  onDelete,
}: SpotCardProps) {
  return (
    <div className="border rounded p-4 bg-zinc-900">
      <h3 className="text-lg font-semibold">{spot.name}</h3>

      {spot.description && (
        <p className="text-sm text-zinc-400">{spot.description}</p>
      )}

      <p className="text-sm mt-2">
        <strong>Evento:</strong> {spot.event.title}
      </p>

      <p className="text-xs text-zinc-400 mb-3">
        Status: {spot.status}
      </p>

      {/* ADMIN */}
      {role === "ADMIN" && (
        <div className="flex gap-2">
          {spot.status === "PENDING" && (
            <>
              <button
                onClick={() => onApprove?.(spot.id)}
                className="px-3 py-1 text-sm bg-green-600 rounded"
              >
                Aprovar
              </button>

              <button
                onClick={() => onReject?.(spot.id)}
                className="px-3 py-1 text-sm bg-yellow-600 rounded"
              >
                Rejeitar
              </button>
            </>
          )}

          <button
            onClick={() => onDelete?.(spot.id)}
            className="px-3 py-1 text-sm bg-red-600 rounded"
          >
            Excluir
          </button>
        </div>
      )}

      {/* PHOTOGRAPHER */}
      {role === "PHOTOGRAPHER" && spot.status === "APPROVED" && (
        <button className="mt-2 px-3 py-1 text-sm bg-blue-600 rounded">
          Enviar Fotos
        </button>
      )}
    </div>
  );
}