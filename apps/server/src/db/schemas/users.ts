import { sql } from 'drizzle-orm'
import { datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

/** 用户表 */
export const usersTable = mysqlTable('users_table', {
  id: int().primaryKey().autoincrement(),
  username: varchar({
    length: 255,
  })
    .notNull()
    .unique(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({
    length: 255,
  }).notNull(),
  createdAt: datetime('created_at', { mode: 'date' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type UserSelect = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert
