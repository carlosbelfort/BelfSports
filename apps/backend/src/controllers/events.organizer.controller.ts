import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listOrganizerEvents(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;

  const events = await prisma.event.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reply.send(events);
}