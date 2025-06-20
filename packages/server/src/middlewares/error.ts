import type Hono from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ClientError } from '../utils/error.ts'

/**
 * 错误处理中间件
 */
export const errorMiddleware: Hono.ErrorHandler = (err, c) => {
  // console.log('err', err)
  if (err instanceof HTTPException) {
    return c.api.error({
      code: err.status,
      message: err.message,
    })
  }
  if (err instanceof ClientError) {
    return c.api.error((err as ClientError).errorResponse)
  }
  return c.api.error({
    message: '服务器内部错误',
  })
}
