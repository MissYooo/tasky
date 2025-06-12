import { db } from "@/db/connection.js";
import { tasksTable } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export const taskService = {
  getAllTasks: async () => {
    const users = await db.select().from(tasksTable);
    return users;
  },
  addTask: async (task: typeof tasksTable.$inferInsert) => {
    await db.insert(tasksTable).values(task);
    return {
      msg: "新增成功",
    };
  },
  updateTask: async (
    id: number,
    task: Partial<Omit<typeof tasksTable.$inferInsert, "id">>
  ) => {
    await db.update(tasksTable).set(task).where(eq(tasksTable.id, id));
    return {
      msg: "修改成功",
    };
  },
  removeTask: async (id: number) => {
    await db.delete(tasksTable).where(eq(tasksTable.id, id));
    return {
      msg: "删除成功",
    };
  },
};
