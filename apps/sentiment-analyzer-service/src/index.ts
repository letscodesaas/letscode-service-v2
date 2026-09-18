import { serve as server } from '@hono/node-server'
import { Hono } from 'hono'
import { serve } from "inngest/hono";
import { functions, inngest } from "./inngest/inngest.js";
import {ConnectDB} from "@repo/database/database";


const app = new Hono();
const connection = new ConnectDB();


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.on(
  ["GET", "PUT", "POST"],
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);


server({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
