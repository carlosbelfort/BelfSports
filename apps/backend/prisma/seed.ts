import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 8);

  await prisma.user.createMany({
    data: [
      { name: 'Admin', email: 'admin@teste.com', password, role: 'ADMIN' },
      { name: 'Organizer', email: 'org@teste.com', password, role: 'ORGANIZER' },
      { name: 'Photographer', email: 'foto@teste.com', password, role: 'PHOTOGRAPHER' },
      { name: 'Viewer', email: 'view@teste.com', password, role: 'VIEWER' }
    ]
  });
}

main();
Execute depois:
npx prisma migrate dev
npx prisma db seed
