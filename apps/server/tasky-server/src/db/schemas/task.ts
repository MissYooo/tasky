import { relations } from 'drizzle-orm'
import { boolean, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { timeStamps } from '../helper/index.ts'
import { usersTable } from './user.ts'

/** 任务表 */
export const tasksTable = mysqlTable('tasks_table', {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
  userId: int()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  ...timeStamps(),
})

export const tasksTableRalations = relations(tasksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tasksTable.userId],
    references: [usersTable.id],
  }),
}))
