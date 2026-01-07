import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listSpots(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user;

  let where: any = {};

  if (user.role === "ORGANIZER") {
    where = { event: { userId: user.sub } };
  }

  if (["PHOTOGRAPHER", "USER"].includes(user.role)) {
    where = { status: "APPROVED", event: { status: "APPROVED" } };
  }

  const spots = await prisma.spot.findMany({
    where,
    include: { event: true },
  });

  return reply.send(spots);
}