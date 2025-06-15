import type {
  UserLoginSchema,
  UserRegisterSchema,
} from './validation.js'
import { Hono } from 'hono'
import { authService } from './service.js'
import {
  userLoginValidator,
  userRegisterValidator,
} from './validation.js'

export const auth = new Hono().basePath('/auth')

// ---用户注册---
auth.post('/register', userRegisterValidator, async (c) => {
  const user: UserRegisterSchema = c.req.valid('json')
  const res = await authService.register(user)
  return c.api.success(res)
})

// ---用户登录---
auth.post('/login', userLoginValidator, async (c) => {
  const user: UserLoginSchema = await c.req.valid('json')
  const res = await authService.login(user)
  return c.api.success(res)
})
