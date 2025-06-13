import { sql } from "drizzle-orm";
import {
  boolean,
  datetime,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

/** 任务表 */
export const tasksTable = mysqlTable("tasks_table", {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
  userId: int()
    .notNull()
    .references(() => usersTable.id, { onDelete: "no action" }),
  createdAt: datetime("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Task = typeof tasksTable.$inferSelect;
export type TaskInsert = typeof tasksTable.$inferInsert;

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
  createdAt: datetime("created_at", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof usersTable.$inferSelect;
export type UserInsert = typeof usersTable.$inferInsert;
