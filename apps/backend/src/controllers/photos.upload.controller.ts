/*import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function uploadPhoto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { spotId } = request.params as { spotId: string };
  const file = (request as any).file;

  if (!file) {
    return reply.status(400).send({ message: "Arquivo não enviado" });
  }

  const spot = await prisma.spot.findUnique({
    where: { id: spotId },
    include: { event: true },
  });

  if (!spot || spot.status !== "APPROVED") {
    return reply.status(400).send({ message: "Spot inválido" });
  }

  const photo = await prisma.photo.create({
    data: {
      filename: file.filename,
      spotId,
    },
  });

  return reply.status(201).send(photo);
}*/
import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function uploadPhoto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { spotId } = request.params as { spotId: string };
  const file = (request as any).file;
  const user = request.user;

  if (!file) {
    return reply.status(400).send({ message: "Arquivo não enviado" });
  }

  const spot = await prisma.spot.findUnique({
    where: { id: spotId },
    include: { event: true },
  });

  if (!spot || spot.status !== "APPROVED" || spot.event.status !== "APPROVED") {
    return reply.status(400).send({ message: "Spot ou evento inválido" });
  }

  if (!["ADMIN", "PHOTOGRAPHER"].includes(user.role)) {
    return reply.status(403).send({ message: "Permissão negada" });
  }

  const photo = await prisma.photo.create({
    data: {
      filename: file.filename,
      spotId,
      approved: user.role === "ADMIN", // ADMIN aprova automaticamente
    },
  });

  return reply.status(201).send(photo);
}
