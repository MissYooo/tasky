import { Context } from "hono";

export const getUserId = (c: Context) => {
  return c.get("jwtPayload").userId as number;
};
