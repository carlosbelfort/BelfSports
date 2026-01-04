import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function listUsers( request: FastifyRequest,
  reply: FastifyReply) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      active: true,
      createdAt: true
    }
  })

  return reply.json(users)
}

export async function updateUserRole(request: FastifyRequest,
  reply: FastifyReply) {
  const { id } = req.params
  const { role } = req.body

  await prisma.user.update({
    where: { id },
    data: { role }
  })

  return res.json({ message: 'Role atualizada' })
}

export async function toggleUserStatus(req, res) {
  const { id } = req.params
  const { active } = req.body

  await prisma.user.update({
    where: { id },
    data: { active }
  })

  return res.json({ message: 'Status atualizado' })
}

export async function deleteUser(req, res) {
  const { id } = req.params

  await prisma.user.delete({ where: { id } })

  return res.status(204).send()
}