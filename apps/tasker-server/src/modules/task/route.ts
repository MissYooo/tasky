import { createRoute } from '@hono/zod-openapi'
import { ApiJSONResponseSchema } from '@orbit/server'
import { z } from 'zod/v4'
import { taskAddSchema, taskGetSchema, taskUpdateSchema } from './schema.ts'

export const taskRoute = {
  getAll: createRoute({
    path: '/',
    method: 'get',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.array(taskGetSchema)),
          },
        },
        description: '获取所有任务',
      },
    },
  }),
  getOne: createRoute({
    path: '/:id',
    method: 'get',
    request: {
      params: z.object({
        id: z.string().describe('任务id'),
      }),
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(taskGetSchema),
          },
        },
        description: '获取指定任务',
      },
    },
  }),
  addTask: createRoute({
    path: '/',
    method: 'post',
    request: {
      body: {
        content: {
          'application/json': {
            schema: taskAddSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.null()),
          },
        },
        description: '新增任务',
      },
    },
  }),
  updateTask: createRoute({
    path: '/:id',
    method: 'put',
    request: {
      params: z.object({
        id: z.string(),
      }),
      body: {
        content: {
          'application/json': {
            schema: taskUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.null()),
          },
        },
        description: '更新任务',
      },
    },
  }),
  deleteTask: createRoute({
    path: '/:id',
    method: 'delete',
    request: {
      params: z.object({
        id: z.string().describe('任务id'),
      }),
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.null()),
          },
        },
        description: '删除任务',
      },
    },
  }),
}
