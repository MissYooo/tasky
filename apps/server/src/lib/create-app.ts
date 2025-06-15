import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import {
  jwtMiddleware,
  notFoundMiddleware,
  respMiddleware,
} from '@/middlewares/index.js'

export function createApp() {
  const app = new OpenAPIHono({
    strict: false,
  })
  app.use(logger())
  app.use('/*', respMiddleware)
  app.use('/*', async (c, next) => {
    if (!['/auth', '/doc'].some(prefix => c.req.path.startsWith(prefix))) {
      return await jwtMiddleware(c, next)
    }
    await next()
  })
  app.notFound(notFoundMiddleware)
  app.onError((err, c) => {
    return c.api.error(err.message)
  })
  return app
}

export type AppOpenAPI = ReturnType<typeof createApp>
