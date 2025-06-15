import { usersTable } from "@/db/schema.js";
import { createInsertSchema, zValidator } from "@/utils/validator.js";
import z from "zod/v4";

// ---用户注册---
/** 用户注册-zod */
export const userRegisterSchema = createInsertSchema(usersTable, {
  username: (schema) => schema.min(3).max(10),
  password: (schema) => schema.min(6).max(16),
  email: () => z.email(),
}).omit({
  id: true,
  createdAt: true,
});

/** 用户注册-type */
export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

/** 用户注册-validator */
export const userRegisterValidator = zValidator("json", userRegisterSchema);

// ---用户登录---
/** 用户登录-zod */
const userLoginSchema = userRegisterSchema.pick({
  username: true,
  password: true,
});

/** 用户登录-type */
export type UserLoginSchema = z.infer<typeof userLoginSchema>;

/** 用户登录-validator */
export const userLoginValidator = zValidator("json", userLoginSchema);
