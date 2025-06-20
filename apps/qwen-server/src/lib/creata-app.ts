import { errorMiddleware, notFoundMiddleware, respFormatMiddleware } from '@orbit/server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

export function createRouter() {
  return new Hono()
}

export function createApp() {
  const app = createRouter()
  app.use(logger())
  app.use(respFormatMiddleware)
  app.notFound(notFoundMiddleware)
  app.onError(errorMiddleware)
  return app
}
