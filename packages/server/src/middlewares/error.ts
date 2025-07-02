import type Hono from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ClientError } from '../utils/error.ts'

/**
 * 错误处理中间件
 */
export const errorMiddleware: Hono.ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return c.api.error({
      code: err.status,
      message: err.message,
    })
  }
  if (err instanceof ClientError) {
    return c.api.error((err as ClientError).errorResponse)
  }
  console.log(err)
  return c.api.error({
    message: '服务器内部错误',
    errors: err,
  })
}
