import type { FastifyRequest, FastifyReply } from "fastify";

/*export default function roleMiddleware(roles: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as any;
    if (!user || !roles.includes(user.role)) {
      return reply.status(403).send({ message: "Acesso negado" });
    }
  };
}*/

export default function roleMiddleware(roles: string[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = req.user as any;
    if (!user || !roles.includes(user.role)) {
      return reply.status(403).send({ message: "Acesso negado" });
    }
  };
}