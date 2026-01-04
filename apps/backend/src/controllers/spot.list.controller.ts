import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listSpots(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { sub: string; role: string };

  const { eventId } = request.query as { eventId?: string };

  const where: any = {};

  // ORGANIZER → apenas spots dele
  if (user.role === "ORGANIZER") {
    where.userId = user.sub;
  }

  // PHOTOGRAPHER → apenas spots aprovados
  if (user.role === "PHOTOGRAPHER") {
    where.status = "APPROVED";
    where.event = {
      status: "APPROVED",
    };
  }

  if (eventId) {
    where.eventId = eventId;
  }

  const spots = await prisma.spot.findMany({
    where,
    include: {
      event: {
        select: {
          id: true,
          title: true,
          date: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reply.send(spots);
}