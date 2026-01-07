import type { FastifyRequest, FastifyReply } from "fastify";
import { Role } from "@prisma/client";

export function verifyRole(roles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userRole = request.user.role;

    if (!roles.includes(userRole)) {
      return reply.status(403).send({
        message: "Acesso não autorizado",
      });
    }
  };
}