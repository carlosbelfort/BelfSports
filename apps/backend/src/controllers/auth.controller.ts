import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function login(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.active) {
    return reply.status(401).send({ message: "Credenciais inválidas" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return reply.status(401).send({ message: "Credenciais inválidas" });
  }

  const token = reply.jwtSign({
    sub: user.id,
    role: user.role,
    name: user.name,
  });

  return reply.send({ token });
}