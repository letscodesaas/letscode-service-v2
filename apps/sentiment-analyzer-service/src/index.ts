import { serve as server } from "@hono/node-server";
import { Hono } from "hono";
import { serve } from "inngest/hono";
import { functions, inngest } from "./inngest/inngest.js";
import { ENV } from "./env/env.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.on(
  ["GET", "PUT", "POST"],
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  }),
);

app.post("/analyze", async (c) => {
  try {
    const data = await c.req.json();
    const { postId, userId, post } = data;
    if (!postId || !userId || !post) {
      c.status(403);
      return c.json({ message: "All fields are required" });
    }
    await inngest.send({
      data: {
        postId,
        userId,
        post,
      },
      name: "event/seniment.function",
    });
      await inngest.send({
      data: {
        postId,
        userId,
        post,
      },
      name: "event/embedding.function",
    });
    c.status(200);
    return c.json({ message: "success" });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

if (ENV.MODE === "dev")
  server(
    {
      fetch: app.fetch,
      port: parseInt(ENV.PORT),
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    },
  );

export default app;
