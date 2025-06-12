import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { task, auth } from "@/controllers/index.js";
const app = new Hono();

app.route("/", task);
app.route("/", auth);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  () => {
    console.log("Done!Done!");
  }
);
