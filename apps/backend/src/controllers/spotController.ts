import { prisma } from '../../prisma'

export async function createSpot(req, res) {
  const userId = req.user.id
  const { eventId } = req.body

  const imageUrl = req.file.path // Cloudinary URL

  const spot = await prisma.spot.create({
    data: {
      imageUrl,
      eventId,
      userId,
      status: 'PENDING',
    }
  })

  res.status(201).json(spot)
}

export async function listApprovedSpots(req, res) {
  const spots = await prisma.spot.findMany({
    where: { status: 'APPROVED' },
    include: { event: true }
  })

  res.json(spots)
}
