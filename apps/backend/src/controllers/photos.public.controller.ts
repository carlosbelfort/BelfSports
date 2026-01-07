import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listPublicGallery(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const photos = await prisma.photo.findMany({
    where: {
      approved: true,
      spot: {
        status: "APPROVED",
        event: { status: "APPROVED" },
      },
    },
    include: {
      spot: {
        include: {
          event: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return reply.send(photos);
}