import { db } from "@/db/connection.js";
import { usersTable } from "@/db/schema.js";
import { sha256 } from "hono/utils/crypto";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";

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
  login: async ({
    username,
    password,
  }: Pick<typeof usersTable.$inferInsert, "username" | "password">) => {
    // 检查用户是否已存在
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));
    if (!existingUser) {
      return {
        msg: "用户不存在",
      };
    }

    // 验证密码
    const passwordMatch = (await sha256(password)) === existingUser.password;
    if (!passwordMatch) {
      return {
        msg: "密码错误",
      };
    }
    // 生成token
    const token = await sign(
      {
        userId: existingUser.id,
        useName: existingUser.username,
      },
      "HonoApp"
    );
    return {
      msg: "登录成功",
      data: token,
    };
  },
};
