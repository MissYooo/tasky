import type { TaskAddSchema, TaskUpdateSchema } from './validation.ts'
import { zValidator } from '@/utils/validator.ts'
import { taskService } from './service.ts'
import { taskAddSchema, taskUpdateSchema } from './validation.ts'
import { createRouter } from '@/lib/create-app.ts'
import { taskRoute } from './route.ts'

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
task.post('/', zValidator('json', taskAddSchema), async (c) => {
  const task: TaskAddSchema = await c.req.valid('json')
  const res = await taskService.addTask(task, c)
  return c.api.success(res)
})

// ---任务修改---
task.put('/:id', zValidator('json', taskUpdateSchema), async (c) => {
  const id = +c.req.param('id')
  const task: TaskUpdateSchema = await c.req.valid('json')
  const res = await taskService.updateTask(id, task, c)
  return c.api.success(res)
})

// --- 任务删除 ---
task.delete('/:id', async (c) => {
  const res = await taskService.removeTask(+c.req.param('id'), c)
  return c.api.success(res)
})
