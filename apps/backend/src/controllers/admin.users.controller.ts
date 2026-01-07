import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listUsers(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
    },
  });

  return reply.send(users);
}

export async function updateUserRole(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { role } = request.body as { role: string };

  await prisma.user.update({
    where: { id },
    data: { role },
  });

  return reply.send({ message: "Role atualizada" });
}

export async function toggleUserStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { active } = request.body as { active: boolean };

  await prisma.user.update({
    where: { id },
    data: { active },
  });

  return reply.send({ message: "Status atualizado" });
}

export async function deleteUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  await prisma.user.delete({ where: { id } });

  return reply.status(204).send();
}