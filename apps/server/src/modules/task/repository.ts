import type { TaskUpdateSchema } from './validation.js'
import type { TaskInsert, TaskSelect, UserSelect } from '@/db/schemas/index.js'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db/connection.js'
import { tasksTable } from '@/db/schemas/index.js'

export const taskRepository = {
  /** 获取单个任务 */
  getTask: async ({ id, userId }: Pick<TaskSelect, 'id' | 'userId'>) => {
    const [task] = await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)))
    console.log('task', task)
    return task
  },
  /** 获取所有任务 */
  getAllTasks: async (userId: UserSelect['id']) => {
    return await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.userId, userId))
  },
  /** 添加任务 */
  addTask: async (task: TaskInsert) => {
    await db.insert(tasksTable).values(task)
  },
  /** 更新任务 */
  updateTask: async (id: TaskSelect['id'], task: Partial<TaskUpdateSchema>) => {
    await db
      .update(tasksTable)
      .set({
        ...task,
        updatedAt: new Date(),
      })
      .where(eq(tasksTable.id, id))
  },
  /** 删除任务 */
  removeTask: async (id: TaskSelect['id']) => {
    await db.delete(tasksTable).where(eq(tasksTable.id, id))
  },
}
