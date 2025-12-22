import { Request, Response } from "express"
import prisma from "../lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" })
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    )

    return res.json({ token })
  }
}

export default new AuthController()