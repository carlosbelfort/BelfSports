import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";


export async function getMe(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
    },
  });

  if (!user) {
    return reply.status(404).send({ message: "Usuário não encontrado" });
  }

  return reply.send(user);
}