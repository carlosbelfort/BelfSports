import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { Role } from "@prisma/client";


//CREATE SPOT (Admin / Organizer)
export async function createSpot(request: any, reply: any) {
  const { eventId } = request.body;
  const user = request.user;

  if (![Role.ADMIN, Role.ORGANIZER].includes(user.role)) {
    return reply.status(403).send({ message: "Acesso negado" });
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    return reply.status(404).send({ message: "Evento não encontrado" });
  }

  if (user.role === Role.ORGANIZER && event.status !== "APPROVED") {
    return reply.status(400).send({ message: "Evento ainda não aprovado" });
  }

  if (user.role === Role.ORGANIZER && event.userId !== user.id) {
    return reply
      .status(403)
      .send({ message: "Evento não pertence ao organizer" });
  }

  const spot = await prisma.spot.create({
    data: {
      eventId: event.id,
      userId: user.id,
    },
  });

  return reply.status(201).send(spot);
}

/**
 * LIST SPOTS (Admin / Organizer / Photographer)
 */
export async function listSpots(req: FastifyRequest, reply: FastifyReply) {
  const user = req.user as any;

  let where: any = {};

  if (user.role === "ORGANIZER") {
    where = {
      event: { userId: user.id },
    };
  }

  if (user.role === "PHOTOGRAPHER" || user.role === "USER") {
    where = {
      event: { status: "APPROVED" },
      status: "APPROVED",
    };
  }

  const spots = await prisma.spot.findMany({
    where,
    include: {
      event: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return reply.send(spots);
}

/**
 * ORGANIZER: listar apenas spots dos eventos dele
 */
export async function listSpotsForOrganizer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user as { sub: string; role: string };

  if (!user || user.role !== "ORGANIZER") {
    return reply.status(403).send({ message: "Acesso negado" });
  }

  const spots = await prisma.spot.findMany({
    where: {
      event: {
        userId: user.sub,
      },
    },
    include: {
      event: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reply.send(spots);
}

/**
 * UPDATE SPOT STATUS (ADMIN)
 */
export async function updateSpotStatus(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as any;
  const { status } = req.body as any;

  const spot = await prisma.spot.update({
    where: { id },
    data: { status },
  });

  return reply.send(spot);
}

/**
 * DELETE SPOT (Admin / Organizer dono)
 */
export async function deleteSpot(req: FastifyRequest, reply: FastifyReply) {
  const user = req.user as any;
  const { id } = req.params as any;

  const spot = await prisma.spot.findUnique({ where: { id } });
  if (!spot) return reply.status(404).send({ message: "Spot não encontrado" });

  if (user.role === "ORGANIZER" && spot.userId !== user.id) {
    return reply.status(403).send({ message: "Não autorizado" });
  }

  await prisma.spot.delete({ where: { id } });

  return reply.status(204).send();
}
