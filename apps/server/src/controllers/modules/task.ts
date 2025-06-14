import { tasksTable } from "@/db/schema.js";
import { taskService } from "@/services/index.js";
import { getUserId } from "@/utils/modules/auth.js";
import {
  createInsertSchema,
  createSelectSchema,
  zValidator,
} from "@/utils/modules/validator.js";
import dayjs from "dayjs";
import { Hono } from "hono";
import { z } from "zod/v4";

export const task = new Hono().basePath("/task");

// ---任务获取---
/** 任务获取schema */
export const taskGetSchema = createSelectSchema(tasksTable, {
  createdAt: (schema) =>
    schema.transform((_) => dayjs(_).format("YYYY-MM-DD HH:mm:ss")),
  updatedAt: (schema) =>
    schema.transform((_) => dayjs(_).format("YYYY-MM-DD HH:mm:ss")),
});
export type TaskGetSchema = z.infer<typeof taskGetSchema>;

task.get("/", async (c) => {
  const tasks = await taskService.getAllTasks(getUserId(c));
  return c.api.success(tasks);
});

// ---任务新增---
/** 任务新增schema */
export const taskAddSchema = createInsertSchema(tasksTable, {
  title: (schema) => schema.max(20),
}).pick({
  title: true,
  completed: true,
});
export type TaskAddSchema = z.infer<typeof taskAddSchema>;

task.post("/", zValidator("json", taskAddSchema), async (c) => {
  const task: TaskAddSchema = await c.req.valid("json");
  const res = await taskService.addTask(task, c);
  return c.api.success(res);
});

// ---任务修改---
/** 任务修改schema */
export const taskUpdateSchema = taskAddSchema.partial();
export type TaskUpdateSchema = z.infer<typeof taskUpdateSchema>;

task.put("/:id", zValidator("json", taskUpdateSchema), async (c) => {
  const task: TaskUpdateSchema = await c.req.valid("json");
  const res = await taskService.updateTask(task, c);
  return c.api.success(res);
});

// --- 任务删除 ---
task.delete("/:id", async (c) => {
  const res = await taskService.removeTask(+c.req.param("id"), c);
  return c.api.success(res);
});
