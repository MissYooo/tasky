import { relations, sql } from 'drizzle-orm'
import { datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { tasksTable } from './task.ts'

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
  createdAt: datetime({ mode: 'date' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const usersTableRalations = relations(usersTable, ({ many }) => ({
  tasks: many(tasksTable),
}))

export type UserSelect = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert
