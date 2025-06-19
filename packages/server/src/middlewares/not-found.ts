import type { NotFoundHandler } from 'hono'
import { ClientError } from '../utils/error.ts'

/**
 * 404中间件
 */
export const notFoundMiddleware: NotFoundHandler = (c) => {
  throw new ClientError({
    code: 404,
    message: `${c.req.path}: 资源不存在`,
  })
}
