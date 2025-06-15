import type { NotFoundHandler } from 'hono'

export const notFoundMiddleware: NotFoundHandler = (c) => {
  return c.json(
    {
      success: false,
      message: `资源不存在---${c.req.path}`,
    },
    404,
  )
}
