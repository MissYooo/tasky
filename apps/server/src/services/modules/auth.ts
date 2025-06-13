import { db } from "@/db/connection.js";
import { usersTable } from "@/db/schema.js";
import { sha256 } from "hono/utils/crypto";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { TokenPrivateKey } from "@/middlewares/index.js";

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
        msg: "用户名或密码错误",
      };
    }

    // 验证密码
    const passwordMatch = (await sha256(password)) === existingUser.password;
    if (!passwordMatch) {
      return {
        msg: "用户名或密码错误",
      };
    }

    // 生成token
    const token = await sign(
      {
        userId: existingUser.id,
        useName: existingUser.username,
        // 一小时过期
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      TokenPrivateKey
    );

    return {
      msg: "登录成功",
      data: token,
    };
  },
};
