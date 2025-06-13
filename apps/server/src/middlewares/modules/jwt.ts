import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
/** jwt PrivateKey */
export const TokenPrivateKey = "HonoApp";

/** jwt Middleware */
export const jwtMiddleware = createMiddleware(async (c, next) => {
  await jwt({
    secret: TokenPrivateKey,
  })(c, next);
  console.log("jwtPayload:", c.get("jwtPayload"));
});
