import type { UserRegisterSchema } from './schema.ts'
import { eq } from 'drizzle-orm'
import { db } from '@/db/connection.ts'
import { usersTable } from '@/db/schemas/index.ts'

export const authRepository = {
  /** 通过用户名查询用户 */
  getUserByName: async (username: string) => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
    return user
  },
  /** 用户注册 */
  register: async (user: UserRegisterSchema) => {
    await db.insert(usersTable).values(user)
  },
}
