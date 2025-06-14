import { zValidator as zv } from "@hono/zod-validator";
import { createSchemaFactory } from "drizzle-zod";
import { HTTPException } from "hono/http-exception";
import z from "zod/v4";

/**
 * 入参校验
 * 二次封装zValidator，抛出统一错误
 */
export const zValidator = (
  target: Parameters<typeof zv>["0"],
  schema: Parameters<typeof zv>["1"]
) =>
  zv(target, schema, (result) => {
    if (!result.success) {
      const error = result.error;
      console.log(error.cause);
      throw new HTTPException(400, {
        message: `${error.issues[0].path[0].toString()}---${
          error.issues[0].message
        }`,
      });
    }
  });

export const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ zodInstance: z });
