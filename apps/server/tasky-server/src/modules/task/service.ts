import type { Context } from 'hono'
import type {
  TaskAddSchema,
  TaskUpdateSchema,
} from './schema.ts'
import type { TaskSelect } from '@/db/schemas/index.ts'
import { ClientError, getUserId } from '@orbit/server'
import { z } from 'zod/v4'
import { taskRepository } from './repository.ts'
import {
  taskGetSchema,
} from './schema.ts'

export const taskService = {
  /** 获取所有任务 */
  getAllTasks: async (c: Context) => {
    return z
      .array(taskGetSchema)
      .parse(await taskRepository.getAllTasks(getUserId(c)))
  },
  /** 获取单个任务 */
  getTask: async (id: TaskSelect['id'], c: Context) => {
    const task = await taskRepository.getTask({
      id,
      userId: getUserId(c),
    })
    if (!task) {
      throw new ClientError({
        code: 404,
        message: '任务不存在',
      })
    }
    return taskGetSchema.parse(task)
  },
  /** 新增任务 */
  addTask: async (task: TaskAddSchema, c: Context) => {
    await taskRepository.addTask({
      ...task,
      userId: getUserId(c),
    })
    return null
  },
  /** 更新任务 */
  updateTask: async (
    id: TaskSelect['id'],
    task: TaskUpdateSchema,
    c: Context,
  ) => {
    await taskService.getTask(id, c)
    await taskRepository.updateTask(id, task)
    return null
  },
  /** 删除任务 */
  removeTask: async (id: number, c: Context) => {
    await taskService.getTask(id, c)
    await taskRepository.removeTask(id)
    return null
  },
}
