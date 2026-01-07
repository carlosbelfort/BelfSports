import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listPendingPhotos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user;

  const where =
    user.role === "ADMIN"
      ? { approved: false }
      : {
          approved: false,
          spot: { event: { userId: user.sub } },
        };

  const photos = await prisma.photo.findMany({
    where,
    include: { spot: { include: { event: true } } },
  });

  return reply.send(photos);
}

export async function approvePhoto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  await prisma.photo.update({
    where: { id },
    data: { approved: true },
  });

  return reply.send({ message: "Foto aprovada" });
}

export async function rejectPhoto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  await prisma.photo.delete({ where: { id } });

  return reply.send({ message: "Foto rejeitada" });
}