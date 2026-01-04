import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listPendingPhotos(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const user = req.user as any;

  const where =
    user.role === "ADMIN"
      ? { approved: false }
      : {
          approved: false,
          spot: { event: { userId: user.id } },
        };

  const photos = await prisma.photo.findMany({
    where,
    include: {
      spot: { include: { event: true } },
    },
  });

  return reply.send(photos);
}

export async function approvePhoto(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as any;

  await prisma.photo.update({
    where: { id },
    data: { approved: true },
  });

  return reply.send({ message: "Foto aprovada" });
}

export async function rejectPhoto(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as any;

  await prisma.photo.delete({ where: { id } });

  return reply.send({ message: "Foto rejeitada" });
}