import { db } from "@/db/connection.js";
import { TaskInsert, tasksTable } from "@/db/schema.js";
import dayjs from "dayjs";
import { and, eq } from "drizzle-orm";

export const taskService = {
  getAllTasks: async (userId: TaskInsert["userId"]) => {
    return {
      msg: "查询成功",
      data: await db
        .select()
        .from(tasksTable)
        .where(and(eq(tasksTable.userId, userId)))
        .then((res) =>
          res.map((_) => ({
            ..._,
            createdAt: dayjs(_.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: dayjs(_.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
          }))
        ),
    };
  },
  addTask: async (task: TaskInsert) => {
    await db.insert(tasksTable).values(task);
    return {
      msg: "新增成功",
    };
  },
  updateTask: async (task: Partial<TaskInsert>) => {
    await db
      .update(tasksTable)
      .set(task)
      .where(
        and(eq(tasksTable.userId, task.userId!), eq(tasksTable.id, task.id!))
      );
    return {
      msg: "修改成功",
    };
  },
  removeTask: async (id: number, userId: number) => {
    await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));
    return {
      msg: "删除成功",
    };
  },
};
