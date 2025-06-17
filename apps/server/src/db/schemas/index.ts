import { sql } from 'drizzle-orm'
import { boolean, datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { timeStamps } from '../helper/index.ts'

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

export type UserSelect = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert

/** 任务表 */
export const tasksTable = mysqlTable('tasks_table', {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
  userId: int()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'no action' }),
  ...timeStamps(),
})

export type TaskSelect = typeof tasksTable.$inferSelect
export type TaskInsert = typeof tasksTable.$inferInsert
