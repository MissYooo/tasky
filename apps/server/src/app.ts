import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { task, auth } from "@/controllers/index.js";
import { jwtMiddleware } from "@/middlewares/index.js";
const app = new Hono();

app.route("/", auth);
app.use("/*", jwtMiddleware);
app.route("/", task);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  () => {
    console.log("Done!Done!");
  }
);
