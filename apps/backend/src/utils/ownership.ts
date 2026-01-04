import { Role, EventStatus } from '@prisma/client'

interface ValidateEventOwnershipParams {
  user: {
    sub: string
    role: Role
  }
  event: {
    userId: string
    status: EventStatus
  }
  requireApproved?: boolean
}

export function validateEventOwnership({
  user,
  event,
  requireApproved = false,
}: ValidateEventOwnershipParams) {
  // ADMIN sempre pode
  if (user.role === 'ADMIN') {
    return
  }

  // Organizer precisa ser dono do evento
  if (user.role === 'ORGANIZER') {
    if (event.userId !== user.sub) {
      throw new Error('Você não tem permissão para acessar este evento.')
    }

    if (requireApproved && event.status !== 'APPROVED') {
      throw new Error('O evento ainda não está aprovado.')
    }

    return
  }

  // Qualquer outro role não é permitido
  throw new Error('Permissão insuficiente.')
}