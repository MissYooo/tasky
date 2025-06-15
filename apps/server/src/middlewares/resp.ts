import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { ContentfulStatusCode } from "hono/utils/http-status";

/** 响应格式化中间件 */
export const respMiddleware = createMiddleware(async (c, next) => {
  if (!c.api) {
    c.api = contextApi(c);
  }
  await next();
});

// 扩展Context类型
declare module "hono" {
  interface Context {
    api: ReturnType<typeof contextApi>;
  }
}

/** contextApi工厂函数 */
const contextApi = (c: Context) => {
  return {
    success: <T>(data: T) => {
      return c.json({
        success: true,
        data,
        timeStamp: Date.now(),
      });
    },
    error: (message: string, status?: ContentfulStatusCode) => {
      return c.json(
        {
          success: false,
          message,
          timeStamp: Date.now(),
        },
        status
      );
    },
  };
};
