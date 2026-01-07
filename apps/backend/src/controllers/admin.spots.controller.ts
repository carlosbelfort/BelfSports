import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listPendingSpots(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const spots = await prisma.spot.findMany({
    where: { status: "PENDING" },
    include: {
      event: true,
      user: { select: { name: true, email: true } },
    },
  });

  return reply.send(spots);
}

export async function updateSpotStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { status } = request.body as {
    status: "APPROVED" | "REJECTED";
  };

  await prisma.spot.update({
    where: { id },
    data: { status },
  });

  return reply.send({ message: "Status atualizado" });
}