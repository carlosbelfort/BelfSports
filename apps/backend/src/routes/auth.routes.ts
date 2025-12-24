import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

/**
 * Rotas de autenticação
 */
export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    // Busca usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return reply.status(401).send({
        message: 'Credenciais inválidas',
      })
    }

    // Compara senha
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return reply.status(401).send({
        message: 'Credenciais inválidas',
      })
    }

    // Gera JWT
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      }
    )

    return reply.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })
  })
}