import type { FastifyRequest, FastifyReply } from "fastify";

export default function roleMiddleware(roles: string[]) {
  return async function (
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    if (!roles.includes(request.user.role)) {
      return reply.status(403).send({ message: "Acesso negado" });
    }
  };
}
