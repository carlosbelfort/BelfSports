import { prisma } from '../../prisma'

export async function listPendingSpots(req, res) {
  const spots = await prisma.spot.findMany({
    where: { status: 'PENDING' },
    include: {
      event: true,
      user: { select: { email: true } }
    }
  })

  res.json(spots)
}

export async function approveSpot(req, res) {
  const { id } = req.params

  await prisma.spot.update({
    where: { id },
    data: { status: 'APPROVED' }
  })

  res.json({ message: 'Spot aprovado' })
}

export async function rejectSpot(req, res) {
  const { id } = req.params

  await prisma.spot.update({
    where: { id },
    data: { status: 'REJECTED' }
  })

  res.json({ message: 'Spot rejeitado' })
}