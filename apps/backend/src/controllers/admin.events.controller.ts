import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listEvents(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return reply.send(events);
}

export async function approveEvent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const event = await prisma.event.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  return reply.send(event);
}

export async function deleteEvent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  await prisma.event.delete({ where: { id } });

  return reply.status(204).send();
}