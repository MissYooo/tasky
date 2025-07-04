import type z from 'zod/v4'
import dayjs from 'dayjs'
import { createSelectSchema } from 'drizzle-zod'
import { tasksTable } from '@/db/schemas/index.ts'

/** 任务-eneity zod */
export const taskEneitySchema = createSelectSchema(tasksTable, {
  id: schema => schema.describe('任务id'),
  userId: schema => schema.describe('用户id'),
  title: schema => schema.max(20).describe('任务标题'),
  completed: schema => schema.describe('是否完成'),
  createdAt: schema =>
    schema.transform(_ => dayjs(_).format('YYYY-MM-DD HH:mm:ss')).describe('创建时间'),
  updatedAt: schema =>
    schema.transform(_ => dayjs(_).format('YYYY-MM-DD HH:mm:ss')).describe('更新时间'),
})

export type TaskEneitySchema = z.infer<typeof taskEneitySchema>

// ---任务获取---
/** 任务获取-zod */
export const taskGetSchema = taskEneitySchema

/** 任务获取-type */
export type TaskGetSchema = z.infer<typeof taskGetSchema>

// ---任务新增---
/** 任务新增-zod */
export const taskAddSchema = taskEneitySchema.pick({
  title: true,
  completed: true,
}).extend({
  completed: taskEneitySchema.shape.completed.default(false),
})

/** 任务新增-type */
export type TaskAddSchema = z.infer<typeof taskAddSchema>

// ---任务修改---
/** 任务修改-zod */
export const taskUpdateSchema = taskAddSchema.partial()
export type TaskUpdateSchema = z.infer<typeof taskUpdateSchema>
