import type z from 'zod/v4'
import { createInsertSchema } from 'drizzle-zod'
import { usersTable } from '@/db/schemas/index.ts'
import { zValidator } from '@/utils/validator.ts'

// ---用户注册---
/** 用户注册-入参-zod */
export const userRegisterSchema = createInsertSchema(usersTable, {
  username: schema => schema.min(3).max(10),
  password: schema => schema.min(6).max(16),
}).omit({
  id: true,
  createdAt: true,
})

/** 用户注册-入参-type */
export type UserRegisterSchema = z.infer<typeof userRegisterSchema>

// ---用户登录---
/** 用户登录-zod */
export const userLoginSchema = userRegisterSchema.pick({
  username: true,
  password: true,
})

/** 用户登录-type */
export type UserLoginSchema = z.infer<typeof userLoginSchema>

/** 用户登录-validator */
export const userLoginValidator = zValidator('json', userLoginSchema)
