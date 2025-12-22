import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function login(req: any, res: any) {
  const { email, senha } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ success: false });

  const valid = await bcrypt.compare(senha, user.password);
  if (!valid) return res.status(401).json({ success: false });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  return res.json({ success: true, token });
}
