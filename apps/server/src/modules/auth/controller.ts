import type {
  UserLoginSchema,
  UserRegisterSchema,
} from './validation.js'
import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod/v4'
import { createRouter } from '@/lib/index.js'
import { authService } from './service.js'
import {
  userLoginValidator,
  userRegisterSchema,
} from './validation.js'

export const auth = createRouter().basePath('/auth')

// ---用户注册---
auth.openapi(createRoute({
  path: '/register',
  method: 'post',
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
          schema: z.null(),
        },
      },
      description: '用户注册',
    },
  },

}), async (c) => {
  const user: UserRegisterSchema = c.req.valid('json')
  await authService.register(user)
  return c.json(null)
})

// ---用户登录---
auth.post('/login', userLoginValidator, async (c) => {
  const user: UserLoginSchema = await c.req.valid('json')
  const res = await authService.login(user)
  return c.api.success(res)
})
