import {
  TaskAddSchema,
  TaskGetSchema,
  taskGetSchema,
  TaskUpdateSchema,
} from "@/controllers/index.js";
import { db } from "@/db/connection.js";
import { TaskInsert, tasksTable } from "@/db/schema.js";
import { getUserId } from "@/utils/modules/auth.js";
import dayjs from "dayjs";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { z } from "zod/v4";

export const taskService = {
  getAllTasks: async (userId: TaskGetSchema["userId"]) => {
    return z.array(taskGetSchema).parse(
      await db
        .select()
        .from(tasksTable)
        .where(and(eq(tasksTable.userId, userId)))
    );
  },
  addTask: async (task: TaskAddSchema, c: Context) => {
    await db.insert(tasksTable).values({
      ...task,
      userId: getUserId(c),
    });
    return null;
  },
  updateTask: async (task: TaskUpdateSchema, c: Context) => {
    const id = +c.req.param("id");
    const userId = getUserId(c);
    const updatedAt = new Date();
    await db
      .update(tasksTable)
      .set({
        ...task,
        id,
        userId,
        updatedAt,
      })
      .where(and(eq(tasksTable.userId, userId), eq(tasksTable.id, id)));
    return null;
  },
  removeTask: async (id: number, c: Context) => {
    const userId = getUserId(c);
    await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));
    return null;
  },
};
