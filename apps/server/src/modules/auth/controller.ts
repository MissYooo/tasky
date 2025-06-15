import { Hono } from "hono";
import {
  UserLoginSchema,
  userLoginValidator,
  UserRegisterSchema,
  userRegisterValidator,
} from "./validation.js";
import { authService } from "./service.js";

export const auth = new Hono().basePath("/auth");

// ---用户注册---
auth.post("/register", userRegisterValidator, async (c) => {
  const user: UserRegisterSchema = c.req.valid("json");
  const res = await authService.register(user);
  return c.api.success(res);
});

// ---用户登录---
auth.post("/login", userLoginValidator, async (c) => {
  const user: UserLoginSchema = await c.req.valid("json");
  const res = await authService.login(user);
  return c.api.success(res);
});
