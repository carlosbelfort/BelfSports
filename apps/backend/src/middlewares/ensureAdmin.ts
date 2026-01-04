import type { FastifyRequest, FastifyReply } from "fastify";

export async function ensureAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (request.user.role !== "ADMIN") {
    return reply.status(403).send({ message: "Acesso negado" });
  }
}