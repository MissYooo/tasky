import { createRouter } from '@/lib/index.ts'
import { userRoute } from './route.ts'
import { authService } from './service.ts'

export const auth = createRouter().basePath('/auth')

// ---用户注册---
auth.openapi(userRoute.register, async (c) => {
  const user = c.req.valid('json')
  await authService.register(user)
  return c.api.success(null)
})

// ---用户登录---
auth.openapi(userRoute.login, async (c) => {
  const user = c.req.valid('json')
  const res = await authService.login(user)
  return c.api.success(res)
})
