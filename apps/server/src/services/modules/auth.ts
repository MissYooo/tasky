import { db } from "@/db/connection.js";
import { usersTable } from "@/db/schema.js";
import { sha256 } from "hono/utils/crypto";

export const authService = {
  register: async (user: typeof usersTable.$inferInsert) => {
    await db.insert(usersTable).values({
      ...user,
      password: (await sha256(user.password))!,
    });
    return {
      msg: "注册成功",
    };
  },
};
