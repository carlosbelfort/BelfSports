/*import Fastify from 'fastify'
import routes from './routes/index.ts'

const app = Fastify({ logger: true })

app.register(routes)

const PORT = 3333

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
*/

import Fastify from 'fastify'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth.routes.ts'

const app = Fastify()

app.register(cors, {
  origin: true,
})

app.register(authRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Backend rodando em http://localhost:3333')
})
