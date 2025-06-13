import { usersTable } from "@/db/schema.js";
import { authService } from "@/services/index.js";
import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";

export const auth = new Hono().basePath("/auth");

const userRigisterSchema = createInsertSchema(usersTable);

const userLoginSchema = userRigisterSchema.pick({
  username: true,
  password: true,
});

auth.post("/register", zValidator("json", userRigisterSchema), async (c) => {
  const user = c.req.valid("json");
  const res = await authService.register(user);
  return c.api.success(res);
});

auth.post("/login", zValidator("json", userLoginSchema), async (c) => {
  const user = await c.req.json();
  const res = await authService.login(user);
  return c.api.success(res);
});
