import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import path from "path";

/**
 * CREATE SPOT (Admin / Organizer / Photographer)
 */
export async function createSpot(req: FastifyRequest, reply: FastifyReply) {
  const user = req.user as any;
  const { eventId } = req.body as any;
  const file = (req as any).file;

  if (!file) {
    return reply.status(400).send({ message: "Arquivo não enviado" });
  }

  // Organizer só pode criar spots em eventos dele
  if (user.role === "ORGANIZER") {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event || event.userId !== user.id) {
      return reply.status(403).send({ message: "Evento não autorizado" });
    }
  }

  const imageUrl = `/uploads/${file.filename}`;

  const spot = await prisma.spot.create({
    data: {
      imageUrl,
      eventId,
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
  } else if (user.role === "PHOTOGRAPHER") {
    where = { userId: user.id };
  }

  const spots = await prisma.spot.findMany({
    where,
    include: {
      event: true,
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reply.send(spots);
}

/**
 * ORGANIZER: listar apenas spots dos eventos dele
 */
export async function listSpotsForOrganizer(req: Request, res: Response) {
  const userId = req.user.id; // id do organizador logado

  const spots = await prisma.spot.findMany({
    where: {
      event: {
        userId: userId, // apenas eventos do Organizer
      },
    },
    include: {
      event: true,
      user: {
        select: { name: true, email: true }, // info do fotógrafo
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(spots);
}
/**
 * UPDATE SPOT STATUS (ADMIN)
 */
export async function updateSpotStatus(req: FastifyRequest, reply: FastifyReply) {
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