/*import type { Request, Response, NextFunction } from "express"

export default function roleMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso negado" })
    }
    next()
  }
}*/

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
