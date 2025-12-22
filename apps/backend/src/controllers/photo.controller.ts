import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function uploadPhoto(req: any, res: any) {
  const photo = await prisma.photo.create({
    data: {
      url: req.file.filename,
      status: 'pending'
    }
  });

  res.json(photo);
}