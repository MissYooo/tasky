import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { createMiddleware } from 'hono/factory'
import { nanoid } from 'nanoid'
import { z } from 'zod/v4'

export function ApiJSONResponseSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    code: z.number().default(200),
    message: z.string().default('操作成功'),
    data: dataSchema,
    requestId: z.string(),
    timestamp: z.string(),
  })
}

export type ApiJSONResponse<T> = Omit<z.infer<ReturnType<typeof ApiJSONResponseSchema<z.ZodType>>>, 'data' | 'code'> & {
  code: ContentfulStatusCode
  data: T
}

export type ApiJSONErrorResponse<T = null, S = any> = ApiJSONResponse<T> & {
  errors?: S
}

// 扩展Context类型
declare module 'hono' {
  interface Context {
    api: ReturnType<typeof apiResponse>
  }
}

export function formatSuccessRes<T>(data: T, options?: Partial<Omit<ApiJSONResponse<T>, 'data' | 'requestId' | 'timestamp'>>): ApiJSONResponse<T> {
  return {
    code: options?.code ?? 200,
    message: options?.message ?? '操作成功',
    data,
    requestId: nanoid(),
    timestamp: `${Date.now()}`,
  }
}

export function formatErrorRes(options: Omit<Partial<ApiJSONErrorResponse>, 'requestId' | 'timestamp'>): ApiJSONErrorResponse {
  return {
    code: options.code ?? 500,
    message: options.message ?? '服务器内部错误',
    data: options.data ?? null,
    requestId: nanoid(),
    timestamp: `${Date.now()}`,
    errors: options.errors,
  } as ApiJSONErrorResponse
}

function apiResponse(c: Context) {
  return {
    success: (...args: Parameters<typeof formatSuccessRes>) => {
      return c.json(formatSuccessRes(...args), 200)
    },
    error: (options: Parameters<typeof formatErrorRes>['0']) => {
      const formatOptions = formatErrorRes(options)
      return c.json(
        formatOptions,
        formatOptions.code,
      )
    },
  }
}

/** 响应格式化中间件 */
export const respFormatMiddleware = createMiddleware(async (c, next) => {
  if (!c.api) {
    c.api = apiResponse(c)
  }
  await next()
})
