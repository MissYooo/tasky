import { taskService } from "@/services/index.js";
import { Hono } from "hono";

export const task = new Hono().basePath("/task");

task.get("/", async (c) => {
  const tasks = await taskService.getAllTasks();
  return c.json(tasks);
});

task.post("/", async (c) => {
  const task = await c.req.json();
  const res = await taskService.addTask(task);
  return c.json(res);
});

task.put("/:id", async (c) => {
  const task = await c.req.json();
  const res = await taskService.updateTask(+c.req.param("id"), task);
  return c.json(res);
});

task.delete("/:id", async (c) => {
  const res = await taskService.removeTask(+c.req.param("id"));
  return c.json(res);
});
