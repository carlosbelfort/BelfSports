/*import type { Request, Response, NextFunction } from "express";

export function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Acesso negado" });
  }

  return next();
}*/

import type { FastifyRequest, FastifyReply } from "fastify";

export async function ensureAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (request.user.role !== "ADMIN") {
    return reply.status(403).send({ message: "Acesso negado" });
  }
}