import { Hono } from "hono";
import { serve } from "@hono/node-server";
import {healthCheckRoute} from "./services/health-check-service/routes/health.check.route.js"

const app = new Hono();

app.route("/api/v1",healthCheckRoute);

serve({
  port: 3000,
  fetch: app.fetch,
});


