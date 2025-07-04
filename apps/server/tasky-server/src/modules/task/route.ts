import { createRoute } from '@hono/zod-openapi'
import { ApiJSONResponseSchema } from '@orbit/server'
import { z } from 'zod/v4'
import { taskAddSchema, taskGetSchema, taskUpdateSchema } from './schema.ts'

export const taskRoute = {
  getAll: createRoute({
    path: '/',
    method: 'get',
    tags: ['任务'],
    summary: '获取所有',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.array(taskGetSchema)),
          },
        },
        description: '',
      },
    },
  }),
  getOne: createRoute({
    path: '/:id',
    method: 'get',
    tags: ['任务'],
    summary: '获取单个',
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
        description: '',
      },
    },
  }),
  addTask: createRoute({
    path: '/',
    method: 'post',
    tags: ['任务'],
    summary: '新增',
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
        description: '',
      },
    },
  }),
  updateTask: createRoute({
    path: '/:id',
    method: 'put',
    tags: ['任务'],
    summary: '修改',
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
        description: '',
      },
    },
  }),
  deleteTask: createRoute({
    path: '/:id',
    method: 'delete',
    tags: ['任务'],
    summary: '删除',
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
        description: '',
      },
    },
  }),
}
