import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function createSpot(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { eventId, name, description } = request.body as any;
  const user = request.user;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.status !== "APPROVED") {
    return reply.status(400).send({ message: "Evento inválido" });
  }

  const spot = await prisma.spot.create({
    data: {
      name,
      description,
      eventId,
      userId: user.sub,
    },
  });

  return reply.status(201).send(spot);
}