import type { Context } from 'hono'

export function getUserId(c: Context) {
  return c.get('jwtPayload').userId as number
}
