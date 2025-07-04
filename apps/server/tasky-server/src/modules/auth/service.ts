import type { UserLoginSchema, UserRegisterSchema } from './schema.ts'
import { ClientError } from '@orbit/server'
import { sign } from 'hono/jwt'
import { sha256 } from 'hono/utils/crypto'
import env from '@/env.ts'
import { authRepository } from './repository.ts'

export const authService = {
  // 用户注册
  register: async (user: UserRegisterSchema) => {
    // 检查用户是否已存在
    const existingUser = await authRepository.getUserByName(user.username)
    if (existingUser) {
      throw new ClientError({
        code: 400,
        message: '用户已存在',
      })
    }
    await authRepository.register({
      ...user,
      password: (await sha256(user.password))!,
    })
    return null
  },
  // 用户登录
  login: async ({ username, password }: UserLoginSchema) => {
    // 检查用户是否已存在
    const existingUser = await authRepository.getUserByName(username)
    if (!existingUser) {
      throw new ClientError({
        code: 400,
        message: '用户名或密码错误',
      })
    }
    // 验证密码
    const passwordMatch = (await sha256(password)) === existingUser.password
    if (!passwordMatch) {
      throw new ClientError({
        code: 400,
        message: '用户名或密码错误',
      })
    }
    // 生成token
    const token = await sign(
      {
        userId: existingUser.id,
        useName: existingUser.username,
        // 一小时过期
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      env.JWT_PrivateKey,
    )
    return token
  },
}
