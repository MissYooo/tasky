import type { UserEneitySchema } from '../auth/schema.ts'
import type { TaskAddSchema, TaskEneitySchema, TaskUpdateSchema } from './schema.ts'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db/connection.ts'
import { tasksTable } from '@/db/schemas/index.ts'

export const taskRepository = {
  /** 获取单个任务 */
  getTask: async ({ id, userId }: Pick<TaskEneitySchema, 'id' | 'userId'>) => {
    const [task] = await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)))
    return task
  },
  /** 获取所有任务 */
  getAllTasks: async (userId: UserEneitySchema['id']) => {
    return await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.userId, userId))
  },
  /** 添加任务 */
  addTask: async (task: TaskAddSchema & {
    userId: UserEneitySchema['id']
  }) => {
    await db.insert(tasksTable).values(task)
  },
  /** 更新任务 */
  updateTask: async (id: TaskEneitySchema['id'], task: Partial<TaskUpdateSchema>) => {
    await db
      .update(tasksTable)
      .set({
        ...task,
        updatedAt: new Date(),
      })
      .where(eq(tasksTable.id, id))
  },
  /** 删除任务 */
  removeTask: async (id: TaskEneitySchema['id']) => {
    await db.delete(tasksTable).where(eq(tasksTable.id, id))
  },
}
