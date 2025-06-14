import { tasksTable } from "@/db/schema.js";
import { taskService } from "@/services/index.js";
import { getUserId } from "@/utils/modules/auth.js";
import { createInsertSchema, zValidator } from "@/utils/modules/validator.js";
import { Hono } from "hono";

export const task = new Hono().basePath("/task");

// ---任务获取---
task.get("/", async (c) => {
  const tasks = await taskService.getAllTasks(getUserId(c));
  return c.api.success(tasks);
});

// ---任务新增---
/** 任务新增schema */
const taskAddSchema = createInsertSchema(tasksTable, {
  title: (schema) => schema.max(20),
}).pick({
  title: true,
  completed: true,
});

task.post("/", zValidator("json", taskAddSchema), async (c) => {
  const task = await c.req.valid("json");
  const res = await taskService.addTask({
    ...task,
    userId: getUserId(c),
  });
  return c.api.success(res);
});

// ---任务修改---
/** 任务修改schema */
const taskUpdateSchema = taskAddSchema;
task.put("/:id", zValidator("json", taskUpdateSchema), async (c) => {
  const task = await c.req.valid("json");
  const res = await taskService.updateTask({
    ...task,
    id: +c.req.param("id"),
    userId: getUserId(c),
    updatedAt: new Date(),
  });
  return c.api.success(res);
});

// --- 任务删除 ---
task.delete("/:id", async (c) => {
  const res = await taskService.removeTask(+c.req.param("id"), getUserId(c));
  return c.api.success(res);
});
