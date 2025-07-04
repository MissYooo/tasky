import { createMiddleware } from 'hono/factory'
import { jwt } from 'hono/jwt'

/** jwt PrivateKey */
export const TokenPrivateKey = 'HonoApp'

interface JwtMiddlewareOptions {
  authWhiteList: string[]
  tokenPrivateKey: string
}

/**
 *
 * @param option
 * @returns jwt中间件
 */
export function jwtMiddleware(option: JwtMiddlewareOptions) {
  return createMiddleware(async (c, next) => {
    if (!option.authWhiteList.some(prefix => c.req.path.startsWith(prefix))) {
      return jwt({
        secret: option.tokenPrivateKey,
      })(c, next)
    }
    await next()
  })
}
