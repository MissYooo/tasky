import type { Context } from 'hono'
import type {
  TaskAddSchema,
  TaskUpdateSchema,
} from './validation.js'
import type { TaskSelect } from '@/db/schema.js'
import { z } from 'zod/v4'
import { getUserId } from '@/utils/auth.js'
import { taskRepository } from './repository.js'
import {
  taskGetSchema,
} from './validation.js'

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
      throw new Error('任务不存在')
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
