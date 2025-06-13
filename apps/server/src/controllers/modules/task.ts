import { taskService } from "@/services/index.js";
import { getUserId } from "@/utils/modules/user.js";
import { Hono } from "hono";

export const task = new Hono().basePath("/task");

task.get("/", async (c) => {
  const tasks = await taskService.getAllTasks(getUserId(c));
  return c.json(tasks);
});

task.post("/", async (c) => {
  const task = await c.req.json();
  const res = await taskService.addTask({
    ...task,
    userId: getUserId(c),
  });
  return c.json(res);
});

task.put("/:id", async (c) => {
  const task = await c.req.json();
  const res = await taskService.updateTask({
    ...task,
    id: +c.req.param("id"),
    userId: getUserId(c),
    updatedAt: new Date(),
  });
  return c.json(res);
});

task.delete("/:id", async (c) => {
  const res = await taskService.removeTask(+c.req.param("id"), getUserId(c));
  return c.json(res);
});
