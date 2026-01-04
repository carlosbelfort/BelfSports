import 'dotenv/config'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('123456', 8)

  const users = [
    { name: 'Admin', email: 'admin@belfsports.com', role: Role.ADMIN },
    { name: 'Organizer', email: 'org@belfsports.com', role: Role.ORGANIZER },
    { name: 'Photographer', email: 'foto@belfsports.com', role: Role.PHOTOGRAPHER },
    { name: 'Viewer', email: 'user@belfsports.com', role: Role.USER }
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
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
    console.error(' Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })