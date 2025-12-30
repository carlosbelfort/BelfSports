import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: string;
  role: string;
  email?: string;
}

export default async function ensureAuth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET não definido");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded !== "object" ||
      !("role" in decoded)
    ) {
      return reply.status(401).send({ message: "Token inválido" });
    }

    request.user = decoded as JwtPayload;
  } catch {
    return reply.status(401).send({ message: "Token inválido" });
  }
}