import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('123456', 8)

  const users = [
    { name: 'Admin', email: 'admin@teste.com', role: 'ADMIN' },
    { name: 'Organizer', email: 'org@teste.com', role: 'ORGANIZER' },
    { name: 'Photographer', email: 'foto@teste.com', role: 'PHOTOGRAPHER' },
    { name: 'Viewer', email: 'view@teste.com', role: 'VIEWER' }
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {}, // não altera se já existir
      create: {
        name: user.name,
        email: user.email,
        password,
        role: user.role
      }
    })
  }

  console.log('✅ Seed executado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
