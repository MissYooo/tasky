import { createInsertSchema } from 'drizzle-zod'
import z from 'zod/v4'
import { usersTable } from '@/db/schemas/index.ts'

// ---用户---
/** 用户 eneity zod */
export const userEneitySchema = createInsertSchema(usersTable, {
  id: schema => schema.describe('用户id'),
  username: schema => schema.min(3).max(10).describe('用户名'),
  password: schema => schema.min(6).max(16).describe('密码'),
  email: () => z.email().describe('邮箱'),
  createdAt: schema => schema.describe('创建时间'),
})

// ---用户注册---
/** 用户注册-入参-zod */
export const userRegisterSchema = userEneitySchema.omit({
  id: true,
  createdAt: true,
})

/** 用户注册-入参-type */
export type UserRegisterSchema = z.infer<typeof userRegisterSchema>

// ---用户登录---
/** 用户登录-zod */
export const userLoginSchema = userEneitySchema.pick({
  username: true,
  password: true,
})

/** 用户登录-type */
export type UserLoginSchema = z.infer<typeof userLoginSchema>
