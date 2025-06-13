import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";

export const TokenPrivateKey = "HonoApp";

export const jwtMiddleware = createMiddleware(async (c, next) => {
  await jwt({
    secret: TokenPrivateKey,
  })(c, next);
  console.log("jwtPayload:", c.get("jwtPayload"));
});
