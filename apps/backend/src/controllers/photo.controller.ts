import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function uploadPhoto(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const user = req.user as any;
  const { id: spotId } = req.params as any;
  const file = (req as any).file;

  if (user.role !== "PHOTOGRAPHER") {
    return reply.status(403).send({ message: "Apenas fotógrafos podem enviar fotos" });
  }

  if (!file) {
    return reply.status(400).send({ message: "Arquivo não enviado" });
  }

  const spot = await prisma.spot.findUnique({
    where: { id: spotId },
    include: { event: true },
  });

  if (!spot) {
    return reply.status(404).send({ message: "Spot não encontrado" });
  }

  if (spot.event.status !== "APPROVED") {
    return reply.status(403).send({ message: "Evento não aprovado" });
  }

  const photo = await prisma.photo.create({
    data: {
      filename: file.filename,
      spotId,
    },
  });

  return reply.status(201).send(photo);
}