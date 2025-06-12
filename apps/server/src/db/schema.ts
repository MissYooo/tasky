import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const tasksTable = mysqlTable("tasks_table", {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 255 }).notNull(),
  completed: boolean().notNull().default(false),
});
