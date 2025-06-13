import { db } from "@/db/connection.js";
import { TaskInsert, tasksTable } from "@/db/schema.js";
import dayjs from "dayjs";
import { and, eq } from "drizzle-orm";

export const taskService = {
  getAllTasks: async (userId: TaskInsert["userId"]) => {
    return await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.userId, userId)))
      .then((res) =>
        res.map((_) => ({
          ..._,
          createdAt: dayjs(_.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: dayjs(_.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
        }))
      );
  },
  addTask: async (task: TaskInsert) => {
    await db.insert(tasksTable).values(task);
    return null;
  },
  updateTask: async (task: Partial<TaskInsert>) => {
    await db
      .update(tasksTable)
      .set(task)
      .where(
        and(eq(tasksTable.userId, task.userId!), eq(tasksTable.id, task.id!))
      );
    return null;
  },
  removeTask: async (id: number, userId: number) => {
    await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));
    return null;
  },
};
