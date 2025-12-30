import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listEvents(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return reply.send(events);
}

export async function deleteEvent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  await prisma.event.delete({
    where: { id },
  });

  return reply.status(204).send();
}