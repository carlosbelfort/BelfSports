import Fastify from 'fastify'
import routes from './routes/index.ts'

const app = Fastify({ logger: true })

app.register(routes)

const PORT = 3333

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
