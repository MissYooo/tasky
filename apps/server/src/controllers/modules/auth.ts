import { authService } from "@/services/index.js";
import { Hono } from "hono";

export const auth = new Hono().basePath("/auth");

auth.post("/register", async (c) => {
  const user = await c.req.json();
  const res = await authService.register(user);
  return c.json(res);
});
