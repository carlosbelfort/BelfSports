import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
/*
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
*/
export async function listSpots(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;
  const userRole = request.user.role;

  let spots;

  if (userRole === "ADMIN") {
    spots = await prisma.spot.findMany({
      include: {
        event: true,
        user: true,
      },
    });
  }

  if (userRole === "ORGANIZER") {
    spots = await prisma.spot.findMany({
      where: { userId },
      include: {
        event: true,
        user: true,
      },
    });
  }

  if (userRole === "PHOTOGRAPHER") {
    spots = await prisma.spot.findMany({
      where: { status: "APPROVED" },
      include: {
        event: true,
      },
    });
  }

  if (userRole === "USER") {
    spots = await prisma.spot.findMany({
      where: { status: "APPROVED" },
      select: {
        id: true,
        imageUrl: true,
        event: true,
      },
    });
  }

  return reply.send(spots);
}