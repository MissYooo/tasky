import { usersTable } from "@/db/schema.js";
import { authService } from "@/services/index.js";
import { createInsertSchema, zValidator } from "@/utils/modules/validator.js";
import { Hono } from "hono";
import { z } from "zod/v4";

export const auth = new Hono().basePath("/auth");

// ---用户注册---
/** 用户注册schema */
const userRegisterSchema = createInsertSchema(usersTable, {
  username: (schema) => schema.min(3).max(10),
  password: (schema) => schema.min(6).max(16),
  email: () => z.email(),
}).omit({
  id: true,
  createdAt: true,
});
export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

auth.post("/register", zValidator("json", userRegisterSchema), async (c) => {
  const user: UserRegisterSchema = c.req.valid("json");
  const res = await authService.register(user);
  return c.api.success(res);
});

// ---用户登录---
/** 用户登录schema */
const userLoginSchema = userRegisterSchema.pick({
  username: true,
  password: true,
});
export type UserLoginSchema = z.infer<typeof userLoginSchema>;

auth.post("/login", zValidator("json", userLoginSchema), async (c) => {
  const user: UserLoginSchema = await c.req.valid("json");
  const res = await authService.login(user);
  return c.api.success(res);
});
