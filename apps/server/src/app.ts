import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { task, auth } from "@/controllers/index.js";
import { jwtMiddleware } from "@/middlewares/index.js";
import { respMiddleware } from "./middlewares/modules/resp.js";
import { HTTPException } from "hono/http-exception";
const app = new Hono();

app.use("/*", respMiddleware);
app.route("/", auth);

app.use("/*", jwtMiddleware);
app.route("/", task);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.api.error(err.message);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  () => {
    console.log("😊 芜湖~  起飞~");
  }
);
