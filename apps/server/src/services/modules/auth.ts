import { db } from "@/db/connection.js";
import { UserInsert, usersTable } from "@/db/schema.js";
import { sha256 } from "hono/utils/crypto";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { TokenPrivateKey } from "@/middlewares/index.js";

export const authService = {
  register: async (user: UserInsert) => {
    // 检查用户是否已存在
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, user.username));
    if (existingUser) {
      throw new Error("用户已存在");
    }

    await db.insert(usersTable).values({
      ...user,
      password: (await sha256(user.password))!,
    });
    return null;
  },
  login: async ({
    username,
    password,
  }: Pick<UserInsert, "username" | "password">) => {
    // 检查用户是否已存在
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));
    if (!existingUser) {
      throw new Error("用户名或密码错误");
    }

    // 验证密码
    const passwordMatch = (await sha256(password)) === existingUser.password;
    if (!passwordMatch) {
      throw new Error("用户名或密码错误");
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

    return token;
  },
};
