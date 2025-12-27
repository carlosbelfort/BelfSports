import { prisma } from '../../prisma'

export async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      active: true,
      createdAt: true
    }
  })

  return res.json(users)
}

export async function updateUserRole(req, res) {
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