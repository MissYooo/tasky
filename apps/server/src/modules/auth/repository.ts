import type { UserInsert } from '@/db/schema.js'
import { eq } from 'drizzle-orm'
import { db } from '@/db/connection.js'
import { usersTable } from '@/db/schema.js'

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
  register: async (user: UserInsert) => {
    await db.insert(usersTable).values(user)
  },
}
