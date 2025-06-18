import { createMiddleware } from 'hono/factory'
import { jwt } from 'hono/jwt'

/** jwt PrivateKey */
export const TokenPrivateKey = 'HonoApp'

/** 无需认证的路由 */
const authWhiteList = ['/auth', '/doc', '/favicon.ico','/.well-known']

/**
 * jwt中间件
 */
export const jwtMiddleware = createMiddleware(async (c, next) => {
  if (!authWhiteList.some(prefix => c.req.path.startsWith(prefix))) {
    return jwt({
      secret: TokenPrivateKey,
    })(c, next)
  }
  await next()
})
