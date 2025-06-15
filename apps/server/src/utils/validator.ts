import { zValidator as zv } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'

/**
 * 入参校验
 * 二次封装zValidator，抛出统一错误
 */
export function zValidator(target: Parameters<typeof zv>['0'], schema: Parameters<typeof zv>['1']) {
  return zv(target, schema, (result) => {
    if (!result.success) {
      const error = result.error
      throw new HTTPException(400, {
        message: `${error.issues[0].path[0].toString()}---${
          error.issues[0].message
        }`,
      })
    }
  })
}
