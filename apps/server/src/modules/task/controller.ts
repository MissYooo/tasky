import type { TaskAddSchema, TaskUpdateSchema } from './schema.ts'
import { createRouter } from '@/lib/create-app.ts'
import { taskRoute } from './route.ts'
import { taskService } from './service.ts'

export const task = createRouter().basePath('/task')

// ---获取所有任务---
task.openapi(taskRoute.getAll, async (c) => {
  const tasks = await taskService.getAllTasks(c)
  return c.api.success(tasks)
})

// ---获取单个任务---
task.openapi(taskRoute.getOne, async (c) => {
  const tasks = await taskService.getTask(+c.req.param('id'), c)
  return c.api.success(tasks)
})

// ---新增任务---
task.openapi(taskRoute.addTask, async (c) => {
  const task: TaskAddSchema = c.req.valid('json')
  const res = await taskService.addTask(task, c)
  return c.api.success(res)
})

// ---更新任务---
task.openapi(taskRoute.updateTask, async (c) => {
  const id = +c.req.param('id')
  const task: TaskUpdateSchema = c.req.valid('json')
  const res = await taskService.updateTask(id, task, c)
  return c.api.success(res)
})

// --- 任务删除 ---
task.openapi(taskRoute.deleteTask, async (c) => {
  const res = await taskService.removeTask(+c.req.param('id'), c)
  return c.api.success(res)
})
