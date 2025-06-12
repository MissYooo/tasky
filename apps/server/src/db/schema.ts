import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

/** 任务表 */
export const tasksTable = mysqlTable("tasks_table", {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
});

/** 用户表 */
export const usersTable = mysqlTable("users_table", {
  id: int().primaryKey().autoincrement(),
  username: varchar({
    length: 255,
  })
    .notNull()
    .unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({
    length: 255,
  }).notNull(),
});
