import type { FastifyInstance } from 'fastify'

// Função única de registro de rotas
export default async function routes(app: FastifyInstance) {
  // Health check
  app.get('/health', async () => {
    return { status: 'ok' }
  })

  // Rota raiz
  app.get('/', async () => {
    return {
      name: 'BelfSports API',
      status: 'running',
    }
  })
}
