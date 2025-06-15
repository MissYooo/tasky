import { jwt } from 'hono/jwt'

/** jwt PrivateKey */
export const TokenPrivateKey = 'HonoApp'

/** jwt Middleware */
export const jwtMiddleware = jwt({
  secret: TokenPrivateKey,
})
