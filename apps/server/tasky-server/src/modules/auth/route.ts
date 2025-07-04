import { createRoute } from '@hono/zod-openapi'
import { ApiJSONResponseSchema } from '@orbit/server'
import { z } from 'zod/v4'
import { userLoginSchema, userRegisterSchema } from './schema.ts'

export const userRoute = {
  register: createRoute({
    path: '/register',
    method: 'post',
    tags: ['用户'],
    summary: '注册',
    request: {
      body: {
        content: {
          'application/json': {
            schema: userRegisterSchema,
          },
        },
        required: true,
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.null()),
          },
        },
        description: '',
      },
    },

  }),
  login: createRoute({
    path: '/login',
    method: 'post',
    tags: ['用户'],
    summary: '登录',
    request: {
      body: {
        content: {
          'application/json': {
            schema: userLoginSchema,
          },
        },
        required: true,
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.string()),
          },
        },
        description: '',
      },
    },

  }),
}
