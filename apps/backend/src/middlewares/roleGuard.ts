import type { FastifyRequest, FastifyReply } from "fastify";

export function roleGuard(roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as { role: string };

    if (!user || !roles.includes(user.role)) {
      return reply.status(403).send({
        message: "Acesso negado",
      });
    }
  };
}