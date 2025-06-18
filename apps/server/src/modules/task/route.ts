import { ApiJSONResponseSchema } from "@/middlewares/resp.ts";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod/v4";
import { taskGetSchema } from "./validation.ts";

export const taskRoute = {
  getAll:createRoute({
    path: '/',
    method: 'get',
    // request: {},
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(z.array(taskGetSchema)),
          },
        },
        description: '获取所有用户',
      },
    },
  }),
  getOne:createRoute({
    path: '/:id',
    method: 'get',
    request: {
      params:z.object({
        id:z.string().describe('用户id')
      })
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ApiJSONResponseSchema(taskGetSchema),
          },
        },
        description: '获取指定用户',
      },
    },
  })
}