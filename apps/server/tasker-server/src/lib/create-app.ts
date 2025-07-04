import { OpenAPIHono } from '@hono/zod-openapi'
import { errorMiddleware, jwtMiddleware, notFoundMiddleware, respFormatMiddleware } from '@orbit/server'
import { logger } from 'hono/logger'

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.api.error({
          code: 400,
          message: '请求参数有误',
          errors: result.error.issues,
        })
      }
    },
  })
}

export function createApp() {
  const app = createRouter()
  app.use(logger())
  app.use(respFormatMiddleware)
  app.use(jwtMiddleware)
  app.notFound(notFoundMiddleware)
  app.onError(errorMiddleware)
  return app
}

export type AppOpenAPI = ReturnType<typeof createApp>
